<script setup lang="ts">

import BaseComponent from './base.component.vue';
import { useTemplateRef, watch, ref } from 'vue'
import useCartStore from '@/stores/cart'
import type {
  Order,
  OrderCreate,
  OrderItem,
  OrderItemCreate,
  OrderStatus,
  Product
} from '@/api/models'
import useOrderStore from '@/stores/order'
import { OrderService } from '@/api/services'

const modalRef = useTemplateRef('cart-modal-ref');

const cartStore = useCartStore();
const orderStore = useOrderStore();

const delivery_address_ref = ref("");
const delivery_time_ref = ref("");
const additional_info_ref = ref("");

const open = () => {
  if (modalRef && modalRef.value) {
    modalRef.value.open();
  }
}

const purchase = async () => {
  // Request here

  const items: OrderItemCreate[] = [];

  for (const item of cartStore.items) {
    items.push({
      product_id: item.productId,
      count: item.count,
    } as OrderItemCreate)
  }

  const dto = {
    items: items,
    delivery_address: delivery_address_ref.value,
    delivery_time: delivery_time_ref.value,
    additional_info: additional_info_ref.value,
  } as OrderCreate;

  const hash = await OrderService.create({ dto });

  if (hash) {
    const activeHashes = JSON.parse(localStorage.getItem('getActiveOrders') || '[]');
    localStorage.setItem('getActiveOrders', JSON.stringify([...activeHashes, hash]));
    orderStore.fetchActiveOrders();
    cartStore.clearCart();
  } else {
    // Здесь ошибку сделать
  }
}

watch(
  () => cartStore.getItems,
  (newValue) => {
    if (newValue.length === 0 && modalRef && modalRef.value) {
      modalRef.value.close();
    }
  }
);

defineExpose({ open });

</script>

<template>
  <base-component ref="cart-modal-ref">
    <div class="cart_modal">
      <div class="cart_modal__title">
        Корзина
      </div>
      <div class="cart_modal__items">
        <div class="cart_modal__items__title">
          Товары ({{cartStore.items.length}})
        </div>
        <div class="cart_modal__items__content">
          <div
            class="cart_modal__item"
            v-for="item in cartStore.getItems"
            :key="`cart_modal__item-${item.productId}`"
          >
            <div class="cart_modal__item__image">
              <img :src="item.product.image_url" alt="">
            </div>
            <div class="cart_modal__item__info">
              <div class="cart_modal__item__info__name">{{ item.product.name }}</div>
              <div class="cart_modal__item__info__price">{{ item.product.price.toLocaleString('ru-RU') }} {{ item.product.currency }}</div>
            </div>
            <div class="cart_modal__item__data">
              <button
                class="cart_modal__item__data__btn"
                @click="() => item.count && item.count > 1 ? cartStore.minusCount(item.productId) : cartStore.removeFromCart(item.productId)"
              >-</button>
              <span>{{ item.count }}</span>
              <button class="cart_modal__item__data__btn" @click="cartStore.plusCount(item.productId)">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart_modal__info">
        <div class="cart_modal__info__title">
          Данные о доставке
        </div>
        <div class="cart_modal__info__content">
          <input v-model="delivery_address_ref" placeholder="Адрес доставки" class="cart_modal__info__content__input">
          <input v-model="delivery_time_ref" placeholder="Вреям доставки" class="cart_modal__info__content__input">
          <textarea v-model="additional_info_ref" class="cart_modal__info__content__input" placeholder="Пожелания к заказу" value="">
          </textarea>
        </div>
      </div>
      <div class="cart_modal__totals">
        <div class="cart_modal__totals__title">
          Итого
        </div>
        <div class="cart_modal__totals__content">
          {{ cartStore.getTotal.toLocaleString('ru-RU') }} RUB
        </div>
      </div>
      <div class="cart_modal__action">
        <button class="cart_modal__action__btn" @click="purchase">
          <i class="pi pi-cart-arrow-down"></i> Оформить заказ
        </button>
      </div>
    </div>
  </base-component>
</template>
