import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAgencyInput {
  @Field({ nullable: true })
  type: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;
}
