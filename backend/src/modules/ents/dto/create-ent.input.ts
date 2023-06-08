import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { EntType } from '../ent.enums';

@InputType()
export class CreateEntInput {
  @Field(() => EntType)
  @IsEnum(EntType, {
    message: `Type must be one of: ${Object.values(EntType)}`,
  })
  type: EntType;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  parentId?: number;
}
