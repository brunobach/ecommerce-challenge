import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryService } from './product-category.service';
import ProductCategory from 'src/models/product_category/entities/product_category.entity';
import ProductCategoryResolver from './product-category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [ProductCategoryResolver, ProductCategoryService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
