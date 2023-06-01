import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrganizationStatus } from '../org.enums';

@InputType()
export class CreateOrganizationsInput {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => OrganizationStatus)
  @IsEnum(OrganizationStatus, {
    message: `Status mast be one of: ${Object.values(OrganizationStatus)}`,
  })
  status: OrganizationStatus;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => ID, { nullable: true })
  parentId?: number;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  users?: number[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  ents?: number[];

  @Field(() => ID)
  creatorId: number;
}

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
});
