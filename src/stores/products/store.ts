import { defineStore } from 'pinia';
import type { ProductState } from './types.ts';
import type { Product, Category } from "@/api/models";
import { CategoriesService, ProductService } from '@/api/services'

const allCategory = {
  id: null,
  name: "Все",
} as Category;

export const useProductsStore = defineStore('products', {
  state: (): ProductState => ({
    loading: false,
    products: [],
    categories: [allCategory],
    selectedCategory: null,
    search: "",
  }),
  getters: {
    isLoading: ({ loading }) => loading,
    currentProducts: ({ products }) => products,
    currentCategories: ({ categories }) => categories,
    getSelectedCategory: ({ selectedCategory }) => selectedCategory,
    getSearch: ({ search }) => search,
  },
  listenLoadAction: [],
  actions: {
    async fetchCategories() {
      const categories = await CategoriesService.retrieve();
      this.categories = [
        allCategory,
        ...categories
      ];
      this.selectedCategory = null;
    },
    setSearch(search: string) {
      this.search = search;
      console.log(search);
      this.fetchProducts();
    },
    setCategory(id: number | null) {
      this.selectedCategory = id;
      this.fetchProducts();
    },
    async fetchProducts() {
      this.loading = true;
      const products: Product[] = await ProductService.retrieve({
        search: this.search,
        categoryId: this.selectedCategory,
      });
      this.products = products;
      this.loading = false;
    },
  },
});
