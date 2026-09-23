import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';
import { OrganizationStatus } from '../organizations';
import { UserRole } from '../users';
import {
  MOCK_ORGANIZATIONS_SIZE,
  MOCK_USERS_SIZE,
} from './constants';

const uniqueEnforcer = new UniqueEnforcer();

export const mockTestAdmins = [
  {
    username: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: '1111',
    userRole: UserRole.SUPER_ADMIN,
  },
  {
    username: 'Admin',
    email: 'admin@gmail.com',
    password: '1111',
    userRole: UserRole.ADMIN,
  },
  {
    username: 'Staff',
    email: 'staff@gmail.com',
    password: '1111',
    userRole: UserRole.STAFF,
  },
];

export const mockUsers = new Array(MOCK_USERS_SIZE).fill(1).map(() => ({
  username: uniqueEnforcer.enforce(() => faker.person.firstName()),
  email: faker.internet.email(),
  password: '1111',
  userRole: faker.helpers.arrayElement(Object.values(UserRole)),
}));

export const mockOrganizations = new Array(MOCK_ORGANIZATIONS_SIZE)
  .fill(1)
  .map(() => ({
    title: faker.company.name(),
    image: faker.image.url({ width: 50, height: 50 }),
    description: faker.lorem.text(),
    status: faker.helpers.arrayElement(Object.values(OrganizationStatus)),
  }));
