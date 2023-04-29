<template>
  <div v-if="isError" class="text-red-500">
    {{ error.message }}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isError() {
      return this.error.message
    },
  },
}
</script>
