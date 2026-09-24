import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrganizationStatus } from '../enums/organization-status.enum';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  slug: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  logo?: string;

  @Field(() => OrganizationStatus, {
    nullable: true,
    defaultValue: OrganizationStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(OrganizationStatus, {
    message: `Status must be one of: ${Object.values(OrganizationStatus)}`,
  })
  status?: OrganizationStatus;
}
