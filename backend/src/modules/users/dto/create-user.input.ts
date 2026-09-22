import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../users.enums';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => UserRole)
  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: `Value roles must be one of ${Object.values(UserRole)}`,
  })
  userRole: UserRole;

  @Field(() => String)
  password: string;
}
