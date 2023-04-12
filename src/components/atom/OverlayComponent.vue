<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-75 z-40"
  ></div>
</template>
<script lang="ts">
export default {
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  unmounted() {
    document.body.style.overflow = 'auto'
  },
}
</script>
