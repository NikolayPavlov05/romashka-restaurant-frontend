<script setup lang="ts">
import HeaderComponent from "./header.component.vue"
import LoaderComponent from "./loader.component.vue"
import ActionsComponent from "./actions.component.vue"

import { onMounted, ref } from 'vue'

const loaderTime = 1000;

const loaderShow = ref(true);
const loaderDisplay = ref(true);

if (loaderTime === 0) {
  loaderDisplay.value = false;
  loaderShow.value = false;
}

onMounted(() => {
  setTimeout(() => {
    loaderShow.value = false;
    setTimeout(() => {
      loaderDisplay.value = false;
    }, loaderTime+1000)
  }, loaderTime)
})
</script>

<template>
  <loader-component :show="loaderShow" />
  <header-component />
  <main class="content">
    <div class="content__container">
      <slot></slot>
    </div>
  </main>
  <actions-component />
</template>
