import { defineStore } from 'pinia';
import type { OrderState } from '@/stores/order/types.ts'
import { OrderService } from '@/api/services'

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    activeOrders: [],
    currentOrder: null,
  }),
  getters: {
    getActiveOrders: ({ activeOrders }) => activeOrders,
    getCurrentOrder: ({ currentOrder }) => currentOrder,
  },
  listenLoadAction: [],
  actions: {
    async fetchActiveOrders() {
      const activeHashes = JSON.parse(localStorage.getItem('getActiveOrders') || '[]');
      this.activeOrders = [...await OrderService.getOrders( {hashList: activeHashes} )];
    },
    setCurrentOrder(orderId: null | number) {
      if (!orderId) {
        this.currentOrder = null;
        return;
      }

      const findOrder = this.activeOrders.filter((_order) => _order.id == orderId);
      if (findOrder) {
        this.currentOrder = findOrder[0];
      } else {
        this.currentOrder = null;
      }
    },
  }
});
