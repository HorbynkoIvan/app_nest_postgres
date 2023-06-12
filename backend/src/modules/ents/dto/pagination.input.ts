import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { EntType } from '../ent.enums';

@InputType()
export class FilterInput {
  @Field(() => [EntType], { nullable: true })
  @IsEnum(EntType, {
    each: true,
    message: `Type must be one of: ${Object.values(EntType)}`,
  })
  @IsOptional()
  types?: EntType[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;
}

@InputType()
export class UsersPaginationInput {
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
    description: 'Get all list of entities',
    defaultValue: false,
  })
  @IsBoolean()
  getAll?: boolean;
}

registerEnumType(EntType, {
  name: 'EntType',
});
