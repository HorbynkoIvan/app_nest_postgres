import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { EntType } from '../ent.enums';

@InputType()
export class FilterInput {
  @Field(() => [EntType], { nullable: true })
  @IsEnum(EntType, {
    each: true,
    message: `Type mast be one of: ${Object.values(EntType)}`,
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

registerEnumType(EntType, {
  name: 'EntType',
});
