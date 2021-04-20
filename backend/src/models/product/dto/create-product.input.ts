import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
@ArgsType()
export class ProductInputType {
  @Field()
  readonly userId: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly price: number;

  @Field(() => [String], { nullable: true })
  readonly product_url_image?: Array<string>;

  @Field()
  readonly is_on_sale: boolean;
}
