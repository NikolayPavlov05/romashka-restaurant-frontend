<script lang="ts" setup>
import CategoriesComponent from './components/categories.component.vue';
import ProductComponent from './components/products.component.vue';
import useProductsStore from '@/stores/products'
import { onMounted, onUnmounted } from 'vue'
import useOrderStore from '@/stores/order'


const productStore = useProductsStore();
const orderStore = useOrderStore();


onMounted(async () => {
  await productStore.fetchProducts();
  await productStore.fetchCategories();
  await orderStore.fetchActiveOrders();
  setInterval(orderStore.fetchActiveOrders, 10000);
});

onUnmounted(() => {
  clearInterval(orderStore.fetchActiveOrders);
})

</script>

<template>
  <categories-component />
  <product-component />
</template>
