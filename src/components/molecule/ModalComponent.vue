<template>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-[40px] z-50 flex flex-col"
  >
    <button class="absolute top-0 right-0 m-6" @click="closeModal">
      &#x2715;
    </button>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { CLOSE_MODAL_EVENT } from '@/constants'

export default {
  methods: {
    closeModal() {
      this.$emit(CLOSE_MODAL_EVENT)
    },
  },
}
</script>
