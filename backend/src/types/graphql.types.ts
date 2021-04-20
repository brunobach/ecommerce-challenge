import { categoryProductLoader } from 'src/db/loaders/products.loader';

export interface IGraphQLContext {
  categoryProductLoader: ReturnType<typeof categoryProductLoader>;
}
