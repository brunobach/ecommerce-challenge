import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Product from './entities/product.entity';
import { ProductInputType } from './dto/create-product.input';
import { ProductService } from './product.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authentication/jwt/jwt-auth.guard';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly _product: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Product])
  public async Products(): Promise<Product[]> {
    return this._product.productRepo.find();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Product])
  public async getProductsFromUser(
    @Args('userId') userId: string,
  ): Promise<Product[]> {
    return this._product.productRepo.find({
      where: { userId },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Product, { nullable: true })
  public async Product(@Args('id') id: string): Promise<Product> {
    return this._product.productRepo.findOne({ where: { id } });
  }

  @UseGuards(GqlAuthGuard)
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

  @UseGuards(GqlAuthGuard)
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

  @UseGuards(GqlAuthGuard)
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
