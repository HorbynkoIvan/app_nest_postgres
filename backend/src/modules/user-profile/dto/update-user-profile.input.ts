import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserProfileInput } from './create-user-profile.input';

@InputType()
export class UpdateUserProfileInput extends PartialType(
  CreateUserProfileInput,
) {
  @Field(() => ID)
  userId: number;
}
