import { Field, InputType, Int } from '@nestjs/graphql';
import { AgencyType } from '../enums';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class GetAgenciesInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsEnum(AgencyType, {
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
