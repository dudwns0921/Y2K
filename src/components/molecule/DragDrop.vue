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
import { getImageURL, uploadImage } from '@/api/firebase/storage'
import { FILE_UPLOADED_EVENT } from '@/constants'

export default {
  methods: {
    async handleDrop(event: DragEvent) {
      event.preventDefault()
      const file = event.dataTransfer?.files[0]
      if (file) {
        const imagesRef = await uploadImage(file)
        if (imagesRef !== undefined) {
          const imageURL = await getImageURL(imagesRef)
          if (imageURL !== undefined) {
            this.$emit(FILE_UPLOADED_EVENT, imageURL)
          }
        }
      }
    },
  },
}
</script>
