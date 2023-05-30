import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrganizationStatus } from './org.enums';

@ObjectType()
export class OrganizationUserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  dateCreate: string;
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

  @Field(() => String)
  createDate: string;
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

  @Field(() => String)
  createDate: string;
}

@ObjectType()
export class DeleteEntetyResultModel {
  @Field(() => Int, { nullable: true })
  affected: number;
}

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
});
