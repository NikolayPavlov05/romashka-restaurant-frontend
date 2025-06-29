<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import useProductsStore from '@/stores/products'

const startScroll = 100;

const search = ref('');
const smallHeader = ref(false);

const productStore = useProductsStore();

const handleScroll = () => {
  if (!smallHeader.value && window.scrollY >= startScroll) {
    smallHeader.value = true;
    return
  }
  if (smallHeader.value && window.scrollY + startScroll <= startScroll) {
    smallHeader.value = false;
    return
  }
};

onMounted(() => {
  smallHeader.value = false;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  smallHeader.value = false;
  window.removeEventListener('scroll', handleScroll);
});

const updateSearch = () => {
  productStore.setSearch(search.value);
};

const clearSearch = () => {
  search.value = '';
  updateSearch();
}

</script>

<template>
  <header class="header" :class="{'header--small': smallHeader}">
    <div class="header__container">
      <div class="header__container__logo">
        <div class="header__container__logo-item"></div>
      </div>
      <div class="header__container__search">
        <i class="pi pi-search header__container__search__icon"></i>
        <input
          class="header__container__search__input"
          type="text"
          placeholder="Поиск"
          v-model="search"
          @keyup.enter="updateSearch"
          @blur="updateSearch"
        >
        <i
          class="pi pi-times header__container__search__clear"
          v-if="search.length > 0"
          @click="clearSearch">
        </i>
      </div>
    </div>
  </header>
</template>
