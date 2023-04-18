<template>
  <div
    class="w-full h-full overflow-auto flex flex-col gap-[22px] pr-[10px] mr-[10px] min-w-max min-h-max"
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
      event-name="add-filter"
      label="필터"
      height="49px"
      @add-filter="handleAddFilter"
    ></FilterInput>
    <div>
      <div v-for="filter in filters" :key="filter">
        {{ filter }}
      </div>
    </div>
    <div class="flex flex-col gap-[12px]">
      <label class="font-bold">시기</label>
      <VueDatePicker v-model="date" range month-picker></VueDatePicker>
    </div>
    <TextArea
      :value="description"
      label="콘텐츠 내용"
      event-name="description-input"
      height="530px"
      @description-input="handleDescriptionInput"
    ></TextArea>
    <div class="flex gap-[16px] justify-end">
      <DefaultButton event-name="close-modal" @close-modal="handleCloseModal"
        >취소</DefaultButton
      >
      <DefaultButton event-name="submit-form" @submit-form="handleSubmitForm"
        >저장</DefaultButton
      >
    </div>
  </div>
</template>
<script lang="ts">
import { CLOSE_MODAL_EVENT } from '@/constants'
import DefaultButton from '../atom/DefaultButton.vue'
import TextArea from '../molecule/TextArea.vue'
import TextInput from '../molecule/TextInput.vue'
import DragDrop from '../molecule/DragDrop.vue'
import FilterInput from '../molecule/FilterInput.vue'
import { saveContent, setFilters } from '@/api/firebase/database'

export default {
  components: { TextInput, TextArea, DefaultButton, DragDrop, FilterInput },
  data() {
    return {
      title: '',
      videoId: '',
      thumbnailURL: '',
      filters: [] as string[],
      date: null,
      description: '',
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
    handleFileUploaded(value: string) {
      this.thumbnailURL = value
    },
    async handleSubmitForm() {
      const contentData = {
        title: this.title,
        videoId: this.videoId,
        thumbnailURL: this.thumbnailURL,
        filters: this.filters,
        date: this.date,
        description: this.description,
      }
      await saveContent(contentData)
      await setFilters(this.filters)
    },
  },
}
</script>
<style lang="scss"></style>
