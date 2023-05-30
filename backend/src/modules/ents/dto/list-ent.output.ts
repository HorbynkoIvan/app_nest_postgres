import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EntEntity } from '../entities/ent.entity';

@ObjectType()
export class EntOutput extends EntEntity {
  @Field(() => Int, { nullable: true })
  dependentCount: number;
}

@ObjectType()
export class GetEntsOutput {
  @Field(() => [EntOutput])
  ents: EntOutput[];

  @Field(() => Int)
  totalCount: number;
}
