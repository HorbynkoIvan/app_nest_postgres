import { PartialType, Field, ID, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateOrganizationInput } from './create-organization.input';

@InputType()
export class UpdateOrganizationsInput extends PartialType(
  CreateOrganizationInput,
) {
  @Field(() => ID)
  @IsInt()
  id: number;
}
