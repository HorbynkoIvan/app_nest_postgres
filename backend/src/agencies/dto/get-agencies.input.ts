import { Field, InputType } from '@nestjs/graphql';
import { AgencyType } from '../enums';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class GetAgenciesInput {
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsEnum(AgencyType, {
    each: true,
    message:
      'Value types must be one of [system, state, district, school, cohort, other]',
  })
  @IsOptional()
  types?: string[];
}
