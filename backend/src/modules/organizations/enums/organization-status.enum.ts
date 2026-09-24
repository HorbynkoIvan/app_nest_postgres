import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
});