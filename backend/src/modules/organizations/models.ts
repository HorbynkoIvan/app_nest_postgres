import {
  Field,
  Int,
  ObjectType,
  registerEnumType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { OrganizationStatus } from './org.enums';

@ObjectType()
export class OrganizationUserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => OrganizationStatus, {
    description: 'The status of the organization',
  })
  status: OrganizationStatus;

  @Field(() => String)
  role: string;

  @Field(() => String)
  email: string;

  @Field(() => GraphQLISODateTime, {
    description: 'The creation date of the user',
  })
  dateCreate: Date;
}

@ObjectType()
export class SubOrganizationModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => OrganizationStatus)
  status: OrganizationStatus;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => GraphQLISODateTime, {
    description: 'The creation date of the sub-organization',
  })
  createDate: Date;
}

@ObjectType()
export class OrganizationModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => OrganizationStatus)
  status: OrganizationStatus;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => SubOrganizationModel, { nullable: true })
  parent: SubOrganizationModel;

  @Field(() => [SubOrganizationModel])
  subOrganizations: SubOrganizationModel[];

  @Field(() => [OrganizationUserModel])
  users: OrganizationUserModel[];

  @Field(() => GraphQLISODateTime, {
    description: 'The creation date of the organization',
  })
  createDate: Date;
}

@ObjectType()
export class DeleteEntetyResultModel {
  @Field(() => Int, { nullable: true })
  affected: number;
}

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
});
