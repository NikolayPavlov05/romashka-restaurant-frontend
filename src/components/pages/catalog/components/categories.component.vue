<script lang="ts" setup>
import useProductsStore from '@/stores/products'
import { computed, type ComputedRef } from 'vue'
import type { Category } from '@/api/models'

const productStore = useProductsStore();

type CategoryInterfaceType = {
  category: Category,
  selected: boolean,
}

const categories: ComputedRef<CategoryInterfaceType[]> = computed(() => {
  return productStore.currentCategories.map((_category: Category) => {
    return {
      category: _category,
      selected: _category.id == productStore.selectedCategory,
    } as CategoryInterfaceType
  });
})

</script>

<template>
  <div class="categories">
    <div class="categories__title">
      Категории
    </div>
    <div class="categories__content">
      <div class="categories__content__items">
        <div
          class="categories__content__items__item"
          :class="{'categories__content__items__item--active': category.selected}"
          v-for="category in categories"
          :key="`category-${category.category.id}`"
          @click="() => productStore.setCategory(category.category.id)"
        >
          {{ category.category.name }}
        </div>
      </div>
    </div>
  </div>
</template>
