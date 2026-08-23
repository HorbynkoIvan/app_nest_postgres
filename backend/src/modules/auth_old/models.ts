import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
  @Field(() => String)
  access_token: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  username: string;
  @Field(() => String)
  role: string;
  @Field(() => Int)
  sub: number;
}
