import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrganizationsService } from '../organizations';
import { LoginType, UsersService } from '../users';
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

    const isUsersLength = (
      await this.usersService.getUsers({ page: 1, pageSize: 1 }, {})
    ).totalCount;

    if (isUsersLength > 50) return;

    for (const user of mockUsers) {
      await this.usersService.createUser(user);
    }
  }

  async seedEnts() {
    const existingEntsCount = (
      await this.entService.getEnts({ page: 1, pageSize: 1 })
    ).totalCount;

    if (existingEntsCount > 50) {
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
      await this.entService.getEnts({ page: 1, pageSize: MOCK_ENTS_SIZE })
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
    const { organizations, totalCount } =
      await this.organizationsService.getOrganizations(
        {
          page: 1,
          pageSize: 1,
        },
        {},
      );

    if (totalCount > 30) return;

    // get data user admins
    const dataAdmins = (
      await this.usersService.getUsers(
        { page: 1, pageSize: 50 },
        { loginTypes: [LoginType.ADMIN] },
      )
    ).users.map(({ id }) => id);

    // get data user staffs
    const dataUsers = (
      await this.usersService.getUsers(
        { page: 1, pageSize: 50 },
        { loginTypes: [LoginType.STAFF] },
      )
    ).users.map(({ id }) => id);

    const entsIds = (
      await this.entService.getEnts({ page: 1, pageSize: MOCK_ENTS_SIZE })
    ).ents.map(({ id }) => id);

    // create organizations with users and entities
    for (const organization of mockOrganizations) {
      await this.organizationsService.createOrganization({
        ...organization,
        usersIds: shuffleArray([...dataUsers, ...dataAdmins]).slice(0, 10),
        entsIds: shuffleArray(entsIds).slice(0, 5),
        creatorId: dataAdmins[Math.floor(Math.random() * dataAdmins.length)],
      });
    }

    // get organizations for set parents
    const organizationIds = organizations.map(({ id }) => id);

    const organizationsL1 = organizationIds.slice(0, 15);
    const organizationsL2 = organizationIds.slice(16);

    for (const id of organizationsL2) {
      await this.organizationsService.updateOrganization({
        id,
        parentId: shuffleArray(organizationsL1)[0],
      });
    }
  }
}
