import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { UserRole } from './enums';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  username: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email: string;

  @Field(() => String, { nullable: true })
  @IsEnum(UserRole)
  @IsOptional()
  role: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password: string;
}

@InputType()
export class UpdateUserData {
  @Field(() => String, { nullable: true })
  @IsOptional()
  username: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email: string;

  @Field(() => String, { nullable: true })
  @IsEnum(UserRole)
  @IsOptional()
  role: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class GetUserInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}

@InputType()
export class GetUsersInput {
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsEnum(UserRole, {
    each: true,
    message: 'Value roles must be admin or staff',
  })
  @IsOptional()
  roles?: string[];
}
