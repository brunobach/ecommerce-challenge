import { Field, HideField, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from '../../product/entities/product.entity';

import { hashPasswordTransform } from 'src/common/transformers/crypto-transform';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profile_url: string;

  @Field()
  @Column()
  is_active: boolean;

  @Column()
  @Field()
  confirmation_email: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @OneToMany(() => Product, (product) => product.userConnection)
  productConnection: Promise<Product[]>;
}
