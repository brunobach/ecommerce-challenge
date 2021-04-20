import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IGraphQLContext } from 'src/types/graphql.types';
import Category from './entities/category.entity';
import Product from '../product/entities/product.entity';
import { CategoryService } from './category.service';

@Resolver(Category)
class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query(() => [Category])
  public async categories(): Promise<Category[]> {
    return this.categoryService.categoryRepo.find();
  }
  @Query(() => Category, { nullable: true })
  public async category(@Args('id') id: number): Promise<Category> {
    return this.categoryService.categoryRepo.findOne(id);
  }

  @Mutation(() => Category)
  public async createCategory(@Args('name') name: string): Promise<Category> {
    const category = new Category();
    category.name = name;
    return this.categoryService.categoryRepo.save(category);
  }

  @ResolveField(() => [Product])
  public async product(
    @Parent() parent,
    @Context() { categoryProductLoader }: IGraphQLContext,
  ): Promise<Product[]> {
    return categoryProductLoader.load(parent.id);
  }
}

export default CategoryResolver;
