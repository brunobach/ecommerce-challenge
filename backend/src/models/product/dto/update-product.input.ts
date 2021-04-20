import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
@ArgsType()
export class UpdateProductType {
  @Field()
  readonly id: string;

  @Field()
  readonly userId: string;

  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly description: string;

  @Field({ nullable: true })
  readonly price: number;

  @Field(() => [String], { nullable: true })
  readonly product_url_image: string[];

  @Field({ nullable: true })
  readonly is_on_sale: boolean;
}
