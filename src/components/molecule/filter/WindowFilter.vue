<template>
  <div
    class="flex justify-center items-center h-full w-max rounded-sm bg-lightGray p-[5px] gap-[10px] cursor-pointer"
    @click="addFilter"
  >
    <p>{{ content }}</p>
  </div>
</template>
<script lang="ts">
import { ADD_FILTER_EVENT } from '@/constants'

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  emits: [ADD_FILTER_EVENT],
  methods: {
    addFilter() {
      this.$emit(ADD_FILTER_EVENT)
    },
  },
}
</script>
