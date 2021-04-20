import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Product from './entities/product.entity';
import { ProductInputType } from './dto/create-product.input';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly _product: ProductService) {}

  @Query(() => [Product])
  public async Products(): Promise<Product[]> {
    return this._product.productRepo.find();
  }

  @Query(() => [Product])
  public async getProductsFromUser(
    @Args('userId') userId: string,
  ): Promise<Product[]> {
    return this._product.productRepo.find({
      where: { userId },
    });
  }

  @Query(() => Product, { nullable: true })
  public async Product(@Args('id') id: string): Promise<Product> {
    return this._product.productRepo.findOne({ where: { id } });
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('userId') userId: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('is_on_sale') is_on_sale: boolean,
    @Args({ name: 'product_url_image', type: () => [String] })
    product_url_image: string[],
  ) {
    const product: ProductInputType = {
      userId,
      name,
      description,
      price,
      is_on_sale,
      product_url_image,
    };
    return await this._product.createProduct(product);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('userId') userId: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('is_on_sale') is_on_sale: boolean,
    @Args({ name: 'product_url_image', type: () => [String] })
    product_url_image: string[],
  ) {
    const product = {
      id,
      userId,
      name,
      description,
      price,
      is_on_sale,
      product_url_image,
    };
    return await this._product.updateProduct(product);
  }

  @Mutation(() => Product)
  public async deleteProduct(@Args('id') id: string): Promise<Product> {
    return await this._product.deleteProduct(id);
  }

  // @Mutation(() => Product)
  // async createProduct(
  //   @Args('input') input: ProductInputType,
  // ): Promise<Product> {
  //   return await this._product.createProduct(input);
  // }
}
