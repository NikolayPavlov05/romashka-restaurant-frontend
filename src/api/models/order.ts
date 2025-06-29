import type { Product } from '@/api/models/product.ts'

export type OrderStatus = {
  id: number;
  name: string;
  is_completed: boolean;
}

export type OrderItem = {
  id: number;
  product: Product;
  count: number;
  price: number;
}

export type Order = {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  created_at: string;
  hash: string;
  delivery_address: string;
  delivery_time: string;
  additional_info: string;
}

export type OrderItemCreate = {
  product_id: number;
  count: number;
}

export type OrderCreate = {
  items: OrderItemCreate[],
  delivery_address: string;
  delivery_time: string;
  additional_info: string;
}
