import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { SortDirection } from '../enums/sort-common.enums';

@InputType()
export class SortInput {
  @Field(() => SortDirection, {
    description: 'Sort asc/desc',
    defaultValue: SortDirection.ASC,
  })
  @IsNotEmpty()
  direction?: SortDirection;
}
