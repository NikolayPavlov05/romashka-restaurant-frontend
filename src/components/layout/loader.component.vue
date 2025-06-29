<script lang="ts" setup>

withDefaults(defineProps<{
  show: boolean;
}>(), {
  show: true,
});

</script>

<template>
  <div class="loader" :class="{'loader--hide': !show}">
    <div class="loader__logo"></div>
  </div>
</template>
