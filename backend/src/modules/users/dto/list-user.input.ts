import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../users.enums';

@InputType()
export class GetUsersFiltersInput {
  @Field(() => [UserRole], { nullable: true })
  @IsArray()
  @IsEnum(UserRole, {
    each: true,
    message: `Value userRole must be one of ${Object.values(UserRole)}`,
  })
  @IsOptional()
  userRoles?: UserRole[];
}
