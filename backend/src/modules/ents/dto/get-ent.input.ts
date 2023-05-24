import { Field, InputType, Int } from '@nestjs/graphql';
import { EntType } from '../enums';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class GetEntInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsEnum(EntType, {
    each: true,
    message:
      'Value types must be one of [system, state, district, school, cohort, other]',
  })
  @IsOptional()
  types?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;
}
