import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ACTIVE = 'active',
  RESTRICTED = 'restricted',
  BLOCKED = 'blocked',
  DISABLED = 'disabled',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});