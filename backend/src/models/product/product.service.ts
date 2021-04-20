import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { User } from 'src/models/user/entities/user.entity';
import Product from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductType } from './dto/update-product.input';
import { ProductInputType } from './dto/create-product.input';

@Injectable()
export class ProductService {
  public constructor(
    @InjectRepository(Product)
    public readonly productRepo: Repository<Product>,
    private readonly userService: UserService,
  ) {}

  public async parentUser(id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  public async createProduct(data: ProductInputType): Promise<Product> {
    const product = this.productRepo.create({
      name: data.name,
      userId: data.userId,
      description: data.description,
      price: data.price,
      product_url_image: data.product_url_image ? data.product_url_image : [],
      is_on_sale: data.is_on_sale,
    });
    return await this.productRepo.save(product);
  }

  public async updateProduct(data: UpdateProductType): Promise<Product> {
    const product = await this.productRepo.findOne(data.id);
    if (!product) {
      throw new NotFoundException('Product Id not found!');
    }

    return this.productRepo.save({ ...product, ...data });
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new Error('Product does not exists');
    }

    const copy = { ...product };
    await this.productRepo.remove(product);
    return copy;
  }
}
