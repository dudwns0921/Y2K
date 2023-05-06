<template>
  <div
    v-if="isFileEmpty"
    class="flex flex-col items-center text-darkGray font-bold border border-black p-[24px]"
    @dragover.prevent
    @drop="setImageURLWithDrop"
  >
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      @change="setImageURLWithInput"
    />
    <p class="text-[40px] cursor-pointer" @click="uploadImageFromLocal">+</p>
    <p class="text-[20px]">클릭하거나 드래그 앤 드랍하여 업로드</p>
    <p>최대 20MB 등록 가능</p>
  </div>
  <div v-else>{{ fileName }}</div>
  <ErrorDisplay :error="notAllowedFileTypeError"></ErrorDisplay>
</template>
<script lang="ts">
import { getImageURL, uploadImage } from '@/api/firebase/storage'
import { FILE_UPLOADED_EVENT } from '@/constants'
import ErrorDisplay from './ErrorDisplay.vue'

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

export default {
  components: { ErrorDisplay },
  emits: [FILE_UPLOADED_EVENT],
  data() {
    return {
      file: {} as File,
      notAllowedFileTypeError: {} as Error,
    }
  },
  computed: {
    isFileEmpty() {
      return this.file instanceof File
        ? this.file.size === 0
          ? true
          : false
        : true
    },
    fileName() {
      return this.file instanceof File ? this.file.name : ''
    },
  },
  methods: {
    uploadImageFromLocal() {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      fileInput.click()
    },
    async setImageURLWithInput(event: Event) {
      event.preventDefault()
      const fileInput = event.target as HTMLInputElement
      try {
        if (fileInput.files) {
          const file = fileInput.files[0]
          if (file) {
            if (allowedTypes.includes(file.type)) {
              this.notAllowedFileTypeError = {} as Error
              this.file = file
              const imageURL = await this.getImageURLFromFirebase(file)
              if (imageURL) {
                this.sendFileUploadedEvent(imageURL)
              }
            } else {
              throw new Error('잘못된 파일 형식입니다.')
            }
          }
        }
      } catch (error) {
        this.notAllowedFileTypeError = error as Error
      }
    },
    async setImageURLWithDrop(event: DragEvent) {
      event.preventDefault()
      const file = event.dataTransfer?.files[0]
      if (file) {
        if (allowedTypes.includes(file.type)) {
          this.notAllowedFileTypeError = {} as Error
          this.file = file
          const imageURL = await this.getImageURLFromFirebase(file)
          if (imageURL) {
            this.sendFileUploadedEvent(imageURL)
          }
        } else {
          throw new Error('잘못된 파일 형식입니다.')
        }
      }
    },
    async getImageURLFromFirebase(file: File) {
      const imagesRef = await uploadImage(file)
      if (imagesRef !== undefined) {
        return await getImageURL(imagesRef)
      }
    },
    sendFileUploadedEvent(imageURL: string) {
      this.$emit(FILE_UPLOADED_EVENT, imageURL)
    },
  },
}
</script>
