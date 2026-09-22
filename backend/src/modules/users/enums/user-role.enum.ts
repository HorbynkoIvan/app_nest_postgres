import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  VISITOR = 'VISITOR',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
