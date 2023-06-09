import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrganizationStatus } from '../organizations.enums';

@InputType()
export class CreateOrganizationsInput {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => OrganizationStatus)
  @IsEnum(OrganizationStatus, {
    message: `Status must be one of: ${Object.values(OrganizationStatus)}`,
  })
  status: OrganizationStatus;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => ID, { nullable: true })
  parentId?: number;

  @Field(() => [ID], { nullable: true, description: 'Array of users IDs' })
  @IsOptional()
  usersIds?: number[];

  @Field(() => [ID], { nullable: true, description: 'Array of ents IDs' })
  @IsOptional()
  entsIds?: number[];

  @Field(() => ID)
  creatorId: number;
}

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
});
