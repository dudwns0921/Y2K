<template>
  <div
    class="w-full h-full overflow-auto flex flex-col gap-[22px] p-[40px] mr-[10px] min-w-max min-h-max"
  >
    <TextInput
      :value="title"
      label="콘텐츠명"
      event-name="title-input"
      height="49px"
      @title-input="handleTitleInput"
    ></TextInput>
    <TextInput
      :value="videoId"
      label="유튜브 동영상 ID"
      event-name="video-id-input"
      height="49px"
      @video-id-input="handleVideoIdInput"
    ></TextInput>
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
    <div class="flex gap-[16px] justify-end">
      <DefaultButton @click="handleCloseModal">취소</DefaultButton>
      <DefaultButton @click="handleSubmitForm">저장</DefaultButton>
    </div>
  </div>
</template>
<script lang="ts">
import { CLOSE_MODAL_EVENT } from '@/constants'
import DefaultButton from '../atom/DefaultButton.vue'
import TextareaComponent from '../molecule/TextareaComponent.vue'
import TextInput from '../molecule/TextInput.vue'
import DragDrop from '../molecule/DragDrop.vue'
import FilterInput from './FilterInput.vue'
import { saveContent } from '@/api/firebase/database'
import { uuidv4 } from '@firebase/util'

export default {
  components: {
    TextInput,
    TextareaComponent,
    DefaultButton,
    DragDrop,
    FilterInput,
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
      videoId: '',
      thumbnailURL: '',
      filters: [] as string[],
      date: null,
      description: '',
      isUpdate: false,
    }
  },
  mounted() {
    // 수정시 기존 작성된 데이터로 초기화
    if (Object.keys(this.contentDataForUpdate).length !== 0) {
      this.title = this.contentDataForUpdate.title
      this.videoId = this.contentDataForUpdate.videoId
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
  methods: {
    handleCloseModal() {
      this.$emit(CLOSE_MODAL_EVENT)
    },
    handleTitleInput(value: string) {
      this.title = value
    },
    handleDescriptionInput(value: string) {
      this.description = value
    },
    handleVideoIdInput(value: string) {
      this.videoId = value
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
      const id = uuidv4()
      const contentData = {
        id: this.isUpdate ? this.contentDataForUpdate?.id : id,
        title: this.title,
        videoId: this.videoId,
        thumbnailURL: this.thumbnailURL,
        filters: this.filters,
        date: this.date,
        description: this.description,
      }
      await saveContent(contentData, this.isUpdate)
    },
  },
}
</script>
<style lang="scss"></style>
