import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: number;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  userName: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  role: string;
}
