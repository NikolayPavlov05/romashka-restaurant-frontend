import type { Order } from '@/api/models'

export type OrderState = {
  activeOrders: Order[];
  currentOrder: Order | null;
}
