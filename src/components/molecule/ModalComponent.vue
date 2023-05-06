<template>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white justify-center p-[40px] z-30 flex flex-col items-center min-w-max min-h-max"
    :style="modalDynamicStyle"
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
  props: {
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
  },
  computed: {
    modalDynamicStyle() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit(CLOSE_MODAL_EVENT)
    },
  },
}
</script>
