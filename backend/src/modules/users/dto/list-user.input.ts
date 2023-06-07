import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { LoginType } from '../users.enums';

@InputType()
export class GetUsersFiltersInput {
  @Field(() => [LoginType], { nullable: true })
  @IsArray()
  @IsEnum(LoginType, {
    each: true,
    message: `Value loginType must be one of ${Object.values(LoginType)}`,
  })
  @IsOptional()
  loginTypes?: LoginType[];
}
