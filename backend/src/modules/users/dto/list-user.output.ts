import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@ObjectType()
export class GetUsersOutput {
  @Field(() => [UserEntity])
  users: UserEntity[];

  @Field(() => Int)
  totalCount: number;
}
