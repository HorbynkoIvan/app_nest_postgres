import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { LoginType, UserStatus } from '../users.enums';

@InputType()
export class UsersFilterInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  username?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;

  @Field(() => [LoginType], { nullable: true })
  @IsArray()
  @IsEnum(LoginType, {
    each: true,
    message: `Value loginType must be one of ${Object.values(LoginType)}`,
  })
  @IsOptional()
  loginTypes?: LoginType[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  organizationId?: number;

  @Field(() => UserStatus, { nullable: true })
  @IsEnum(UserStatus, {
    message: `Value loginType must be one of ${Object.values(UserStatus)}`,
  })
  @IsOptional()
  status?: UserStatus;
}
