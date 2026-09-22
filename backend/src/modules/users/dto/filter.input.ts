import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { UserRole, UserStatus } from '../users.enums';

@InputType()
export class UsersFilterInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  username?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;

  @Field(() => [UserRole], { nullable: true })
  @IsArray()
  @IsEnum(UserRole, {
    each: true,
    message: `Value userRole must be one of ${Object.values(UserRole)}`,
  })
  @IsOptional()
  userRoles?: UserRole[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  organizationId?: number;

  @Field(() => UserStatus, { nullable: true })
  @IsEnum(UserStatus, {
    message: `Value userRole must be one of ${Object.values(UserStatus)}`,
  })
  @IsOptional()
  status?: UserStatus;
}
