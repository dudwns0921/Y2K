<template>
  <div
    class="flex justify-center items-center h-full w-max rounded-sm bg-lightGray p-[5px] gap-[10px] cursor-pointer"
    @click="addFilter"
  >
    <p>{{ content }}</p>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    addFilter() {
      this.$emit('add-filter')
    },
  },
}
</script>
