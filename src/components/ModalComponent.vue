<template>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 z-50"
  >
    <h2 class="text-lg font-medium mb-4">{{ title }}</h2>
    <div class="mb-4">{{ content }}</div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
}
</script>
