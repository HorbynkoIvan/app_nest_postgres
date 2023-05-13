import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAgencyInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  type: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;
}
