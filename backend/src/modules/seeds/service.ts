import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrganizationsService } from '../organizations';
import { UsersService } from '../users';
// import { UserRole } from '../users/enums/user-role.enum';
// import { shuffleArray } from './hanglers';
import {
  // mockOrganizations,
  mockTestAdmins,
  mockUsers,
} from './mocks';

@Injectable()
export class SeedsService implements OnModuleInit {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private organizationsService: OrganizationsService,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('isUseSeeds')) return;

    await this.runSeeds();
  }

  private async runSeeds() {
    this.logger.verbose('RUN SEEDS');
    await this.seedUsers();
    await this.seedOrganizations();
    this.logger.verbose('FINISHED SEEDS');
  }

  async seedUsers() {
    const totalUsers = (
      await this.usersService.getUsers({ page: 1, pageSize: 1 }, {})
    ).totalCount;

    if (totalUsers > 50) {
      this.logger.verbose('Users already exist. Skipping seeds.');
      return;
    }

    for (const admin of mockTestAdmins) {
      const isAdmin = await this.usersService.getUser({ email: admin.email });

      if (!isAdmin) {
        await this.usersService.createUser(admin);
      }
    }

    for (const user of mockUsers) {
      await this.usersService.createUser(user);
    }
  }

  async seedOrganizations() {
    const {  totalCount } =
      await this.organizationsService.getOrganizations(
        {
          page: 1,
          pageSize: 1,
        },
        {},
      );

    if (totalCount > 30) {
      this.logger.verbose('Organizations already exist. Skipping seeds.');
      return;
    }

    // get data user admins
    // const dataAdmins = (
    //   await this.usersService.getUsers(
    //     { page: 1, pageSize: 50 },
    //     { userRoles: [UserRole.ADMIN] },
    //   )
    // ).users.map(({ id }) => id);

    // get data user staffs
    // const dataUsers = (
    //   await this.usersService.getUsers(
    //     { page: 1, pageSize: 50 },
    //     { userRoles: [UserRole.STAFF] },
    //   )
    // ).users.map(({ id }) => id);
    //
    // // create organizations with users and entities
    // for (const organization of mockOrganizations) {
    //   await this.organizationsService.createOrganization({
    //     ...organization,
    //     usersIds: shuffleArray([...dataUsers, ...dataAdmins]).slice(0, 10),
    //     creatorId: dataAdmins[Math.floor(Math.random() * dataAdmins.length)],
    //   });
    // }

    // get organizations for set parents
    // const organizationIds = organizations.map(({ id }) => id);

    // const organizationsL1 = organizationIds.slice(0, 15);
    // const organizationsL2 = organizationIds.slice(16);

    // for (const id of organizationsL2) {
    //   await this.organizationsService.updateOrganization({
    //     id,
    //     parentId: shuffleArray(organizationsL1)[0],
    //   });
    // }
  }
}
