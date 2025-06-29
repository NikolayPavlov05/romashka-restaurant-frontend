<script setup lang="ts">
import useCartStore from '@/stores/cart'
import { CartModal, OrderModal } from "../modals";
import { useTemplateRef, watch } from 'vue'
import useOrderStore from '@/stores/order'
import type { Order } from '@/api/models'

const cartStore = useCartStore();
const orderStore = useOrderStore();

const cartRef = useTemplateRef('cart-modal-component-ref');
const orderRef = useTemplateRef('order-modal-component-ref');

const openCart = () => {
  if (cartRef && cartRef.value) {
    cartRef.value.open();
  }
}

const openOrder = (id: number) => {
  if (orderRef && orderRef.value) {
    orderStore.setCurrentOrder(id);
  }
}

watch(
  () => orderStore.getCurrentOrder,
  (newValue: Order | null) => {
    if (orderRef && orderRef.value) {
      if (newValue) {
        orderRef.value.open();
      } else {
        orderRef.value.close();
      }
    }
  },
);

</script>

<template>
  <cart-modal ref="cart-modal-component-ref" />
  <order-modal ref="order-modal-component-ref" />
  <div class="actions">
    <div class="actions__cart" v-if="cartStore.getItems.length > 0" @click="openCart">
      <div class="actions__cart__item">
        <div class="actions__cart__item__side">
          <div class="actions__cart__item__title">
            Корзина
          </div>
          <div class="actions__cart__item__status">
            <p>{{ cartStore.getItems.length }} позиции</p>
          </div>
        </div>
        <div class="actions__cart__item__side actions__cart__item__side--action">
          <span>{{ cartStore.getTotal.toLocaleString('ru-RU') }} RUB</span>
          <i class="pi pi-angle-right"></i>
        </div>
      </div>
    </div>
    <div
      class="actions__active_order"
      v-for="order in orderStore.getActiveOrders"
      :key="`actions__active_order-${order.id}`"
      @click="openOrder(order.id)"
    >
      <div class="actions__active_order__item">
        <div class="actions__active_order__item__side">
          <div class="actions__active_order__item__title">
            Заказ № {{order.id}}
          </div>
          <div class="actions__active_order__item__status">
            <span class="actions__active_order__item__status-circle"></span>
            <p>{{order.status.name}}</p>
          </div>
        </div>
        <div class="actions__active_order__item__side actions__active_order__item__side--action">
          <i class="pi pi-angle-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
