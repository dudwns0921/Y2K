<template>
  <div
    class="flex justify-center items-center h-[60px] p-[20px] rounded-sm cursor-pointer bg-lightGray"
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
}
</script>
