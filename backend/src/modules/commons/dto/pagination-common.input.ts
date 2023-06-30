import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { description: 'The page number (minimum: 1)' })
  @Min(1)
  @IsOptional()
  page?: number;

  @Field(() => Int, {
    description: 'The number of items per page (minimum: 1, maximum: 100)',
  })
  @Min(1)
  @Max(100)
  @IsOptional()
  pageSize?: number;
}
