<template>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white justify-center p-[40px] z-20 flex flex-col items-center h-4/5 w-3/5 min-w-max min-h-max"
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
