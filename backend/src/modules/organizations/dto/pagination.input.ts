import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class OrganizationsPaginationInput {
  @Field(() => Int, { description: 'The page number' })
  @Min(1)
  page: number;

  @Field(() => Int, { description: 'The number of items per page' })
  @Min(1)
  @Max(100)
  pageSize: number;
}
