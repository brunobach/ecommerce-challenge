import DataLoader = require('dataloader');
import { getRepository } from 'typeorm';
import Product from 'src/models/product/entities/product.entity';
import ProductCategory from 'src/models/product_category/entities/product_category.entity';

const batchProdutcs = async (categoryIds: string[]) => {
  const productsCategory = await getRepository(ProductCategory)
    .createQueryBuilder('productsCategory')
    .leftJoinAndSelect('productsCategory.product', 'product')
    .where('productsCategory.category IN(:...ids)', { ids: categoryIds })
    .getMany();
  const categoryIdToProducts: { [key: string]: Product[] } = {};
  productsCategory.forEach((productCategory) => {
    if (!categoryIdToProducts[productCategory.categoryId]) {
      categoryIdToProducts[productCategory.categoryId] = [
        (productCategory as any).__product__,
      ];
    } else {
      categoryIdToProducts[productCategory.categoryId].push(
        (productCategory as any).__product__,
      );
    }
  });
  return categoryIds.map((categoryId) => categoryIdToProducts[categoryId]);
};
const categoryProductLoader = () => new DataLoader(batchProdutcs);

export { categoryProductLoader };
