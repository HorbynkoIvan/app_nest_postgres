import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrganizationModelData {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class UserModel {
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

  @Field(() => [OrganizationModelData])
  organizations: OrganizationModelData[];
}

@ObjectType()
export class UserDeleteModel {
  @Field(() => [String])
  raw: string[];

  @Field(() => Int)
  affected: number;
}

@ObjectType()
export class UserUpdateModel {
  @Field(() => [String])
  generatedMaps: string[];
}
