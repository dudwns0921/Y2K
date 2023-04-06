<template>
  <button
    class="bg-gray-800 text-white px-4 py-2 rounded-md"
    @click="handleClick"
  >
    {{ title }}
  </button>
</template>
<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit(this.eventName)
    },
  },
}
</script>
