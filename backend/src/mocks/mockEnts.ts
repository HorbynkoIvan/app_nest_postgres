import { faker } from '@faker-js/faker';

export const mockEnts = new Array(50).fill(1).map(() => ({
  description: faker.lorem.paragraph(),
  title: faker.company.name(),
  type: faker.helpers.arrayElement([
    'system',
    'state',
    'district',
    'school',
    'cohort',
    'other',
  ]),
}));
