<template>
  <div
    class="flex flex-col items-center text-darkGray font-bold border border-black p-[24px]"
    @dragover.prevent
    @drop="handleDrop"
  >
    <p class="text-[40px]">+</p>
    <p class="text-[20px]">클릭하거나 드래그 앤 드랍하여 업로드</p>
    <p>최대 20MB 등록 가능</p>
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    handleDrop(event: DragEvent) {
      event.preventDefault()
      const file = event.dataTransfer?.files[0]
      this.$emit('file-drop', file)
    },
  },
}
</script>
