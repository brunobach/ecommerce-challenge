import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import Product from 'src/models/product/entities/product.entity';
import ProductCategory from 'src/models/product_category/entities/product_category.entity';

@ObjectType()
@Entity({ name: 'categories' })
export default class Category {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [Product], { nullable: true })
  product: Product[];
  // Associations
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  productConnection: Promise<ProductCategory[]>;
}
