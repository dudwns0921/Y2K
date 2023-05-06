<template>
  <div
    class="w-full h-full bg-gray-800 opacity-75 z-40"
    @click="emitCLoseModal"
  ></div>
</template>
<script lang="ts">
import { CLOSE_MODAL_EVENT } from '@/constants'

export default {
  emits: [CLOSE_MODAL_EVENT],
  methods: {
    emitCLoseModal() {
      this.$emit(CLOSE_MODAL_EVENT)
    },
  },
}
</script>
