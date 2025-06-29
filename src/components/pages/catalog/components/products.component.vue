<script lang="ts" setup>

import { computed, type ComputedRef } from 'vue'
import type { Product } from "@/api/models";
import useProductsStore from '@/stores/products';
import useCartStore from '@/stores/cart';
import { CartItem } from '@/stores/cart/types';

type ProductCatalog = {
  product: Product;
  in_cart: boolean;
  count: number | null;
}

const productStore = useProductsStore();
const cartStore = useCartStore();

const products: ComputedRef<Array<ProductCatalog>> = computed(() => {
  return productStore.products.map((_product: Product) => {
    const cartItem = cartStore.items.filter((item: CartItem) => item.productId == _product.id);
    return {
      product: _product,
      in_cart: cartItem.length > 0,
      count: cartItem.length ? cartItem[0].count : null,
    } as ProductCatalog
  });
})

</script>

<template>
  <div class="products" v-if="productStore.isLoading">
    <div class="products__loading">
      <span class="load"></span>
    </div>
  </div>
  <div class="products" v-else>
    <template v-if="products.length == 0">
      <div class="products__not_found">
        <div class="products__not_found__title">Ничего не найдено 😓</div>
        <div class="products__not_found__description">Попробуй поменять параметры поиска</div>
      </div>
    </template>
    <template v-else>
      <div class="products__title">
        Блюда ({{products.length}})
      </div>
      <div class="products__content">
        <div class="product" v-for="product in products" v-key="`product-${product.product.id}`">
          <div class="product__image">
            <img class="product__image__item" :src="product.product.image_url">
          </div>
          <div class="product__name">
            {{product.product.name}}
          </div>
          <div class="product__description">
            {{product.product.description}}
          </div>
          <div class="product__price">
            {{product.product.price.toLocaleString('ru-RU')}} {{product.product.currency}}
          </div>
          <div class="product__action" v-if="product.in_cart">
            <div class="product__action__left">
              <button
                class="product__action__left__minus"
                @click="() => product.count && product.count > 1 ? cartStore.minusCount(product.product.id) : cartStore.removeFromCart(product.product.id)"
              >
                -
              </button>
              <span class="product__action__left__count">{{ product.count }}</span>
              <button
                class="product__action__left__plus"
                @click="cartStore.plusCount(product.product.id)"
              >
                +
              </button>
            </div>
            <div class="product__action__right">
              <button class="product__action__right__btn" @click="cartStore.removeFromCart(product.product.id)">
                <i class="pi pi-trash"></i> Убрать
              </button>
            </div>
          </div>
          <div class="product__action" v-else>
            <button
              class="product__action-btn_add"
              @click="cartStore.addToCart(product.product)"
            >
              <i class="pi pi-cart-plus"></i> Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
