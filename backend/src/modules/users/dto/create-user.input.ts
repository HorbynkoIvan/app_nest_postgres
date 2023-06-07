import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { LoginType } from '../users.enums';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => LoginType)
  @IsNotEmpty()
  @IsEnum(LoginType, {
    message: `Value roles must be one of ${Object.values(LoginType)}`,
  })
  loginType: LoginType;

  @Field(() => String)
  password: string;
}
