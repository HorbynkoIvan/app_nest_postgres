import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, Max, Min } from 'class-validator';

@InputType()
export class OrganizationsPaginationInput {
  @Field(() => Int, { description: 'The page number (minimum: 1)' })
  @Min(1)
  page: number;

  @Field(() => Int, {
    description: 'The number of items per page (minimum: 1, maximum: 100)',
  })
  @Min(1)
  @Max(100)
  pageSize: number;

  @Field(() => Boolean, {
    description: 'Get all list of organizations',
    defaultValue: false,
  })
  @IsBoolean()
  getAll?: boolean;
}
