import { ProductCategoryModule } from './models/product_category/product-category.module';
import { AuthModule } from './authentication/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './models/user/user.module';

import * as ormOptions from './config/orm';
import { ProductModule } from './models/product/product.module';
import { CategoryModule } from './models/category/category.module';
import { CloudinaryProvider } from './app.provider';

//const gqlImports = [UserResolver, AuthResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    UserModule,
    ProductModule,
    CategoryModule,
    ProductCategoryModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule {}
