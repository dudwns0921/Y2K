<template>
  <div
    id="formComponent"
    class="w-full h-full overflow-auto flex flex-col gap-[22px] p-[40px] mr-[10px] min-w-max min-h-max relative"
  >
    <TextInput
      :value="title"
      label="콘텐츠명"
      event-name="title-input"
      height="49px"
      @title-input="handleTitleInput"
    ></TextInput>
    <URLInput
      :value="videoURL"
      label="유튜브 동영상 URL"
      event-name="video-url-input"
      height="49px"
      @video-url-input="handleVideoURLInput"
      @video-url-validation-done="handleVideoURLValidationDone"
      @video-url-validation-reset="handleVideoURLValidationReset"
    ></URLInput>
    <div class="flex flex-col gap-[12px]">
      <label class="font-bold">썸네일</label>
      <DragDrop @file-uploaded="handleFileUploaded"></DragDrop>
    </div>
    <FilterInput
      label="필터"
      height="49px"
      :filters-for-update="
        contentDataForUpdate?.filters ? [...contentDataForUpdate.filters] : []
      "
      @add-filter="handleAddFilter"
      @delete-filter="handleDeleteFilter"
    ></FilterInput>
    <div class="flex flex-col gap-[12px]">
      <label class="font-bold">시기</label>
      <VueDatePicker v-model="date" range month-picker></VueDatePicker>
    </div>
    <TextareaComponent
      :value="description"
      label="콘텐츠 내용"
      event-name="description-input"
      @description-input="handleDescriptionInput"
    ></TextareaComponent>
    <div class="flex gap-[16px] justify-end items-center">
      <ErrorDisplay :error="formError"></ErrorDisplay>
      <DefaultButton @click="handleCloseModal">취소</DefaultButton>
      <DefaultButton @click="handleSubmitForm">저장</DefaultButton>
    </div>
  </div>
</template>
<script lang="ts">
import { CLOSE_MODAL_EVENT, CHECK_IS_FORM_WORKING } from '@/constants'
import DefaultButton from '../atom/DefaultButton.vue'
import TextareaComponent from '../molecule/TextareaComponent.vue'
import TextInput from '../molecule/input/TextInput.vue'
import URLInput from '../molecule/input/URLInput.vue'
import DragDrop from '../molecule/DragDrop.vue'
import FilterInput from './FilterInput.vue'
import { saveContent } from '@/api/firebase/database'
import { uuidv4 } from '@firebase/util'
import type { yearAndMonth } from '@/types/content'
import type { ContentData } from '@/types/content'
import ErrorDisplay from '../molecule/ErrorDisplay.vue'

export default {
  components: {
    TextInput,
    URLInput,
    TextareaComponent,
    DefaultButton,
    DragDrop,
    FilterInput,
    ErrorDisplay,
  },
  props: {
    contentDataForUpdate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      videoURL: '',
      thumbnailURL: '',
      filters: [] as string[],
      date: null as unknown,
      description: '',
      isUpdate: false,
      formError: {} as Error,
      isVideoURLValidationDone: false,
    }
  },
  computed: {
    isFormCompleted() {
      return (
        this.title &&
        this.videoURL &&
        this.isVideoURLValidationDone &&
        this.thumbnailURL &&
        this.filters.length > 0 &&
        this.date !== null &&
        this.description
      )
    },
    isFormWorking() {
      return (
        this.title !== '' ||
        this.videoURL !== '' ||
        this.thumbnailURL !== '' ||
        this.filters.length > 0 ||
        this.date !== null ||
        this.description !== ''
      )
    },
  },
  mounted() {
    this.$emitter.on(CHECK_IS_FORM_WORKING, this.handleCheckIsFormWorking)
    // 수정시 기존 작성된 데이터로 초기화
    if (Object.keys(this.contentDataForUpdate).length !== 0) {
      this.title = this.contentDataForUpdate.title
      this.videoURL = this.contentDataForUpdate.videoURL
      this.thumbnailURL = this.contentDataForUpdate.thumbnailURL
      this.filters = [...this.contentDataForUpdate.filters]
      this.date = this.contentDataForUpdate.date
      this.description = this.contentDataForUpdate.description

      this.isUpdate = true
    } else {
      if (this.isUpdate) {
        this.isUpdate = false
      }
    }
  },
  unmounted() {
    this.$emitter.off(CHECK_IS_FORM_WORKING, this.handleCheckIsFormWorking)
  },
  methods: {
    handleCheckIsFormWorking() {
      this.$emit(CHECK_IS_FORM_WORKING, this.isFormWorking)
    },
    handleVideoURLValidationDone() {
      this.isVideoURLValidationDone = true
    },
    handleVideoURLValidationReset() {
      this.isVideoURLValidationDone = false
    },
    handleCloseModal() {
      this.$emit(CLOSE_MODAL_EVENT)
    },
    handleTitleInput(value: string) {
      this.title = value
    },
    handleDescriptionInput(value: string) {
      this.description = value
    },
    handleVideoURLInput(value: string) {
      this.videoURL = value
    },
    handleAddFilter(value: string) {
      this.filters.push(value)
    },
    handleDeleteFilter(filter: string) {
      const indexToDelete = this.filters.indexOf(filter)
      this.filters.splice(indexToDelete, 1)
    },
    handleFileUploaded(value: string) {
      this.thumbnailURL = value
    },
    async handleSubmitForm() {
      try {
        if (this.isFormCompleted) {
          if (this.formError) this.formError = {} as Error
          const id = uuidv4()
          const contentData: ContentData = {
            id: this.isUpdate ? this.contentDataForUpdate?.id : id,
            title: this.title,
            videoURL: this.videoURL,
            thumbnailURL: this.thumbnailURL,
            filters: this.filters,
            date: this.date as yearAndMonth[],
            description: this.description,
          }
          await saveContent(contentData)
        } else {
          if (!this.isVideoURLValidationDone) {
            throw new Error('URL 등록 버튼을 눌러주세요.')
          } else {
            throw new Error('모든 항목을 입력해주세요.')
          }
        }
      } catch (error) {
        this.formError = error as Error
      }
    },
  },
}
</script>
<style lang="scss"></style>
