<script setup lang="ts">

import BaseComponent from './base.component.vue';
import { computed, type ComputedRef, useTemplateRef } from 'vue';
import type { Order } from '@/api/models'
import useOrderStore from '@/stores/order'

const modalRef = useTemplateRef('cart-modal-ref');

const orderStore = useOrderStore();

const order: ComputedRef<Order | null> = computed(() => {
  return orderStore.getCurrentOrder;
})

const open = () => {
  if (modalRef && modalRef.value) {
    modalRef.value.open();
  }
}

const close = () => {
  if (modalRef && modalRef.value) {
    modalRef.value.close();
  }
}

const orderDelivered = () => {
  if (order.value) {
    const activeHashes = JSON.parse(localStorage.getItem('getActiveOrders') || '[]');
    localStorage.setItem(
      'getActiveOrders',
      JSON.stringify([...activeHashes.filter((_hash: string) => _hash != order.value?.hash)])
    );
    orderStore.fetchActiveOrders();
    orderStore.setCurrentOrder(null);
  }
}

defineExpose({ open, close });

</script>

<template>
  <base-component ref="cart-modal-ref" :on-close="() => orderStore.setCurrentOrder(null)">
    <div class="cart_modal" v-if="order">
      <div class="cart_modal__title">
        Заказ № {{ order.id }}
      </div>
      <div class="cart_modal__status">
        <span class="cart_modal__status-circle"></span>
        <p>{{ order.status.name }}</p>
      </div>
      <div class="cart_modal__items">
        <div class="cart_modal__items__title">
          Товары ({{ order.items.length }})
        </div>
        <div class="cart_modal__items__content">
          <div
            class="cart_modal__item"
            v-for="item in order.items"
            :key="`order-cart_modal__item-${item.id}`"
          >
            <div class="cart_modal__item__image">
              <img :src="item.product.image_url" alt="">
            </div>
            <div class="cart_modal__item__info">
              <div class="cart_modal__item__info__name">{{ item.product.name }}</div>
              <div class="cart_modal__item__info__price">{{ item.product.price.toLocaleString('ru-RU') }} {{ item.product.currency }}</div>
            </div>
            <div class="cart_modal__item__data">
              <span>{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cart_modal__info">
        <div class="cart_modal__info__title">
          Данные о доставке
        </div>
        <div class="cart_modal__info__content">
          <div class="cart_modal__info__content__data">
            <label>Адрес доставки</label>
            <p>
              {{ order.delivery_address}}
            </p>
          </div>
          <div class="cart_modal__info__content__data">
            <label>Вреям доставки</label>
            <p>
              {{ order.delivery_time}}
            </p>
          </div>
          <div class="cart_modal__info__content__data">
            <label>Пожелания к заказу</label>
            <p>
              {{ order.additional_info}}
            </p>
          </div>
          <div class="cart_modal__info__content__data">
            <label>Дата создания</label>
            <p>
              {{ order.created_at}}
            </p>
          </div>
        </div>
      </div>
      <div class="cart_modal__totals">
        <div class="cart_modal__totals__title">
          Итого
        </div>
        <div class="cart_modal__totals__content">
          {{ order.total.toLocaleString('ru-RU') }} RUB
        </div>
      </div>
      <div class="cart_modal__action" v-if="order.status.is_completed">
        <button class="cart_modal__action__btn" @click="orderDelivered">
          <i class="pi pi-check"></i> Заказ доставлен
        </button>
      </div>
    </div>
  </base-component>
</template>
