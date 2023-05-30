import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrganizationsService } from '../organizations';
import { UsersService } from '../users';
import { shuffleArray } from './hanglers';
import {
  mockOrganizations,
  mockEnts,
  mockTestAdmins,
  mockUsers,
} from './mocks';
import { EntService } from '../ents';
import { MOCK_ENTS_SIZE } from './constants';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger();

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private entService: EntService,
    private organizationsService: OrganizationsService,
  ) {
    if (this.configService.get<boolean>('IS_USE_SEEDS')) {
      this.logger.verbose('RUN SEEDS');

      (async () => {
        await this.seedUsers();
        await this.seedEnts();
        await this.seedOrganizations();
      })();
    }
  }

  async seedUsers() {
    for (const admin of mockTestAdmins) {
      const isAdmin = await this.usersService.getUser({ email: admin.email });

      isAdmin ?? (await this.usersService.createUser(admin));
    }

    const isUsersLength = (await this.usersService.getUsers({})).length;

    if (isUsersLength > 50) return;

    for (const user of mockUsers) {
      await this.usersService.createUser(user);
    }
  }

  async seedEnts() {
    if (
      (await this.entService.getEnts({ page: 1, pageSize: 1 }, {})).totalCount >
      50
    ) {
      this.logger.verbose('Ents data already exists. Skipping seeds.');
      return;
    }

    // create half of entities without parents
    for (const ent of mockEnts.slice(0, mockEnts.length / 2)) {
      await this.entService.create({
        ...ent,
      });
    }

    const savedEnts = (
      await this.entService.getEnts({ page: 1, pageSize: MOCK_ENTS_SIZE }, {})
    ).ents.map(({ id }) => id);

    // create half of entities with parents
    for (const ent of mockEnts.slice(mockEnts.length / 2)) {
      await this.entService.create({
        ...ent,
        parentId: savedEnts[Math.floor(Math.random() * savedEnts.length)],
      });
    }
  }

  async seedOrganizations() {
    // check is exists organizations seeds
    const isOrganizationsLength = (
      await this.organizationsService.getOrganizations()
    ).length;
    if (isOrganizationsLength > 30) return;

    // get data user admins
    const dataAdmins = (
      await this.usersService.getUsers({ roles: ['admin'] })
    ).map(({ id }) => id);

    // get data user staffs
    const dataUsers = (
      await this.usersService.getUsers({ roles: ['staff'] })
    ).map(({ id }) => id);

    const entsIds = (
      await this.entService.getEnts({ page: 1, pageSize: MOCK_ENTS_SIZE }, {})
    ).ents.map(({ id }) => id);

    // create organizations with users and entities
    for (const organization of mockOrganizations) {
      await this.organizationsService.createOrganization({
        ...organization,
        users: shuffleArray([...dataUsers, ...dataAdmins]).slice(0, 10),
        ents: shuffleArray(entsIds).slice(0, 5),
        creatorId: dataAdmins[Math.floor(Math.random() * dataAdmins.length)],
      });
    }

    // get organizations for set parents
    const organizations = (
      await this.organizationsService.getOrganizations()
    ).map(({ id }) => id);

    const organizationsL1 = organizations.slice(0, 15);
    const organizationsL2 = organizations.slice(16);

    for (const id of organizationsL2) {
      this.organizationsService.updateOrganization({
        id,
        parentId: shuffleArray(organizationsL1)[0],
      });
    }
  }
}
