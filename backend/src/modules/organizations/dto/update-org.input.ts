import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrganizationStatus } from '../org.enums';

@InputType()
export class UpdateOrganizationsInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => OrganizationStatus, { nullable: true })
  @IsEnum(OrganizationStatus, {
    message: `Type mast be one of: ${Object.values(OrganizationStatus)}`,
  })
  @IsOptional()
  status?: OrganizationStatus;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => ID, { nullable: true })
  parentId?: number;

  @Field(() => [ID], { nullable: true })
  users?: number[];

  @Field(() => ID, { nullable: true })
  creatorId?: number;
}

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
});
