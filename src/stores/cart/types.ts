import type { Product } from '@/api/models'

export type CartItem = {
  productId: number;
  product: Product;
  count: number;
  price: number;
}

export type CartState = {
  items: CartItem[];
  total: number;
}
