import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './entities/category.entity';
import { CategoryInput } from './dto/category.input';

@Injectable()
export class CategoryService {
  public constructor(
    @InjectRepository(Category)
    public readonly categoryRepo: Repository<Category>,
  ) {}

  public async createProduct(data: CategoryInput): Promise<Category> {
    const product = this.categoryRepo.create({
      name: data.name,
    });

    return await this.categoryRepo.save(product);
  }
}
