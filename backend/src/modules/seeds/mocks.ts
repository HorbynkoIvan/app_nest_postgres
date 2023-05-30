import { faker } from '@faker-js/faker';
import { OrganizationStatus } from '../organizations';
import { EntType } from '../ents';
import {
  MOCK_ENTS_SIZE,
  MOCK_ORGANIZATIONS_SIZE,
  MOCK_USERS_SIZE,
} from './constants';

export const mockTestAdmins = [
  {
    username: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: '1111',
    role: 'superAdmin',
  },
  {
    username: 'Admin',
    email: 'admin@gmail.com',
    password: '1111',
    role: 'admin',
  },
  {
    username: 'Staff',
    email: 'staff@gmail.com',
    password: '1111',
    role: 'staff',
  },
];

export const mockUsers = new Array(MOCK_USERS_SIZE).fill(1).map(() => ({
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: '1111',
  role: faker.helpers.arrayElement(['admin', 'staff']),
}));

export const mockOrganizations = new Array(MOCK_ORGANIZATIONS_SIZE)
  .fill(1)
  .map(() => ({
    title: faker.company.name(),
    image: faker.image.url({ width: 50, height: 50 }),
    description: faker.lorem.text(),
    status: faker.helpers.arrayElement(Object.values(OrganizationStatus)),
  }));

export const mockEnts = new Array(MOCK_ENTS_SIZE).fill(1).map(() => ({
  type: faker.helpers.arrayElement(Object.values(EntType)),
  title: faker.company.name(),
  description: faker.lorem.text(),
}));
