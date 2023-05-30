import { Field, ObjectType } from '@nestjs/graphql';
import { EntEntity } from '../entities/ent.entity';

@ObjectType()
export class GetEntOutput extends EntEntity {
  @Field(() => [GetEntOutput], { nullable: true, defaultValue: [] })
  dependents: GetEntOutput[];
}
