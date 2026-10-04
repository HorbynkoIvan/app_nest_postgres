import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field(() => ID)
  userId: number;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  picture?: string;
}
