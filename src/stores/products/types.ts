import type { Category, Product } from '@/api/models'

export type ProductState = {
  loading: boolean;
  products: Array<Product>;
  categories: Array<Category>;
  selectedCategory: number | null;
  search: string;
}
