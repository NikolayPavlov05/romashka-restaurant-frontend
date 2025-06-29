<script setup lang="ts">

import { ref } from 'vue'

const props = withDefaults(defineProps<{
  onClose: CallableFunction | null
}>(), {
  onClose: null,
});

const opened = ref(false);

const open = () => {
  opened.value = true;
}

const close = () => {
  opened.value = false;
  if (props.onClose) {
    props.onClose();
  }
}

defineExpose({open, close});

const clickOutControl = (e) => {
  if (e.target.classList.contains('modal--open')) {
    close();
    if (props.onClose) {
      props.onClose();
    }
  }
}

</script>
<template>
  <div class="modal" :class="{'modal--open': opened}" @click="clickOutControl">
    <div class="modal__content">
      <div class="modal__content__close" @click="close">
        <i class="pi pi-times"></i>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
