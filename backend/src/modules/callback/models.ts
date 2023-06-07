import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseCallbackModel {
  @Field()
  message: string;
}
