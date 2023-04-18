<template>
  <div
    class="flex justify-center items-center h-full w-max rounded-sm bg-lightGray p-[5px] gap-[10px]"
  >
    <p>{{ content }}</p>
    <button type="button" @click.stop="emitDeleteFilterEvent">&#x2715;</button>
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
    emitDeleteFilterEvent() {
      this.$emit('delete-filter')
    },
  },
}
</script>
