import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EntEntity } from '../entities/ent.entity';

@ObjectType()
export class GetEntsOutput {
  @Field(() => [EntEntity])
  agencies: EntEntity[];

  @Field(() => Int)
  totalCount: number;
}
