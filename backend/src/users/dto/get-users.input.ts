import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../enums';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class GetUsersInput {
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsEnum(UserRole, {
    each: true,
    message: 'Value roles must be one of [superAdmin, admin, staff]',
  })
  @IsOptional()
  roles?: string[];
}
