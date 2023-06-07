import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  @Min(1)
  @IsNotEmpty()
  page: number;

  @Field(() => Int)
  @Min(1)
  @Max(100)
  @IsNotEmpty()
  pageSize: number;
}
