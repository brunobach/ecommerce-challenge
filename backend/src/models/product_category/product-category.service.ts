import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ProductCategory from './entities/product_category.entity';
import ProductCategoryInput from './dto/product-category.input';

@Injectable()
export class ProductCategoryService {
  public constructor(
    @InjectRepository(ProductCategory)
    public readonly product_categoryRepo: Repository<ProductCategory>,
  ) {}

  public async createProduct(data): Promise<ProductCategory> {
    const product = this.product_categoryRepo.create({
      categoryId: data.categoryId,
      productId: data.productId,
    });

    return await this.product_categoryRepo.save(product);
  }
}
