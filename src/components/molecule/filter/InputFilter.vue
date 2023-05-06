<template>
  <div
    class="flex justify-center items-center h-full w-max rounded-sm bg-lightGray p-[5px] gap-[10px]"
  >
    <p>{{ content }}</p>
    <button type="button" @click.stop="emitDeleteFilterEvent">&#x2715;</button>
  </div>
</template>
<script lang="ts">
import { DELETE_FILTER_EVENT } from '@/constants'

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  emits: [DELETE_FILTER_EVENT],
  methods: {
    emitDeleteFilterEvent() {
      this.$emit(DELETE_FILTER_EVENT)
    },
  },
}
</script>
