import ProductCategory from './entities/product_category.entity';
import { ProductCategoryService } from './product-category.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Arg } from 'type-graphql';

@Resolver()
class ProductCategoryResolver {
  constructor(private readonly repoService: ProductCategoryService) {}

  @Mutation(() => ProductCategory)
  public async createProductCategory(
    @Args('categoryId') catId: string,
    @Args('productId') prodId: string,
  ): Promise<ProductCategory> {
    const product = {
      productId: prodId,
      categoryId: catId,
    };
    return this.repoService.product_categoryRepo.save(product);
  }

  @Query(() => [ProductCategory])
  public async productCategories(): Promise<ProductCategory[]> {
    return this.repoService.product_categoryRepo.find();
  }

  @Query(() => ProductCategory)
  public async productCategory(
    @Arg('id') id: number,
  ): Promise<ProductCategory> {
    return this.repoService.product_categoryRepo.findOne(id);
  }
}

export default ProductCategoryResolver;
