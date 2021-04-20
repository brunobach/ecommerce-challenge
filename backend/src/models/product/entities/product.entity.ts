import ProductCategory from 'src/models/product_category/entities/product_category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

export interface ProductPropertyImage {
  url: string[];
}

@ObjectType()
@Entity({ name: 'products' })
export default class Product {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'user_id' })
  userId: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  product_url_image?: Array<string>;

  @Field()
  @Column()
  is_on_sale: boolean;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => User)
  user: User;

  // Associations
  @ManyToOne(() => User, (user) => user.productConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  categoryConnection: Promise<ProductCategory[]>;
}
