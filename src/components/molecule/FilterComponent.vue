<template>
  <div
    class="inline-block rounded-sm cursor-pointer h-[60px] flex items-center justify-center p-[20px] bg-lightGray text-black"
    @click="addFilter"
  >
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TextBox',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    addFilter() {
      console.log('add Filter 처리 필요')
    },
  },
}
</script>
