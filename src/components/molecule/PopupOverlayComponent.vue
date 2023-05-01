<template>
  <div
    class="w-full h-full bg-gray-800 opacity-75 z-40"
    @click="emitCLoseModal"
  ></div>
</template>
<script lang="ts">
import { CLOSE_MODAL_EVENT } from '@/constants'

export default {
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  unmounted() {
    document.body.style.overflow = 'auto'
  },
  methods: {
    emitCLoseModal() {
      this.$emit(CLOSE_MODAL_EVENT)
    },
  },
}
</script>
