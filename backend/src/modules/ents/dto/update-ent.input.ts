import { CreateEntInput } from './create-ent.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEntInput extends PartialType(CreateEntInput) {
  @Field(() => Int)
  id: number;
}
