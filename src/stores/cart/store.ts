import { defineStore } from 'pinia';
import type { CartState, CartItem } from './types.ts'
import type { Product } from '@/api/models'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    total: 0,
  }),
  getters: {
    getTotal: ({ total }) => total,
    getItems: ({ items }) => items,
  },
  listenLoadAction: [],
  actions: {
    recalculateTotal() {
      let total = 0;
      for (const item of this.items) {
        total += item.price * item.count;
      }
      this.total = total;
    },
    addToCart(product: Product) {
      this.items = [...this.items, {productId: product.id, count: 1, price: product.price, product: product} as CartItem];
      this.recalculateTotal();
    },
    removeFromCart(id: number) {
      this.items = [...this.items.filter((item) => item.productId != id)];
      this.recalculateTotal();
    },
    plusCount(id: number) {
      this.items = [
        ...this.items.map((item) => {
          if (item.productId == id) item.count +=1;
          return item;
        })
      ];
      this.recalculateTotal();
    },
    clearCart() {
      this.items = [];
      this.total = 0;
    },
    minusCount(id: number) {
      this.items = [
        ...this.items.map((item) => {
          if (item.productId == id) item.count -=1;
          return item;
        })
      ];
      this.recalculateTotal();
    },
  },
});
