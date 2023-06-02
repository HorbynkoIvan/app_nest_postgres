import { PartialType, Field, ID, InputType } from '@nestjs/graphql';
import { CreateOrganizationsInput } from './create-organization.input';

@InputType()
export class UpdateOrganizationsInput extends PartialType(
  CreateOrganizationsInput,
) {
  @Field(() => ID)
  id: number;
}
