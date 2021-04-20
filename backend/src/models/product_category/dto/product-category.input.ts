import { Field, InputType } from 'type-graphql';

@InputType()
class ProductCategoryInput {
  @Field()
  readonly categoryId: string;
  @Field()
  readonly productId: string;
}

export default ProductCategoryInput;
