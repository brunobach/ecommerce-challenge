import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from '../../category/entities/category.entity';
import Product from '../../product/entities/product.entity';
@ObjectType()
@Entity({ name: 'products_categories' })
export default class ProductCategory {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @PrimaryColumn({ name: 'product_id' })
  productId: string;

  @Field()
  @PrimaryColumn({ name: 'category_id' })
  categoryId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @ManyToOne(() => Product, (product) => product.categoryConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Promise<Product>;

  @ManyToOne(() => Category, (category) => category.productConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Promise<Category>;
}
