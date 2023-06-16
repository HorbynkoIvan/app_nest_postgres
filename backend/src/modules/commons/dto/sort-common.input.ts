import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { SortDirection } from '../enums';

@InputType()
export class SortInput {
  @Field(() => SortDirection, {
    description: 'Sort asc/desc',
    defaultValue: SortDirection.ASC,
  })
  @IsOptional()
  sortOrderById?: SortDirection;
}
