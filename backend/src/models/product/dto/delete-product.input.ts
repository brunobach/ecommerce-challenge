import { Field, InputType } from 'type-graphql';
@InputType()
export class DeleteProductInput {
  @Field()
  readonly id: number;
}
