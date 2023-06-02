import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class FilterInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(100)
  title?: string;
}
