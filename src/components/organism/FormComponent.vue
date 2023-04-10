<template>
  <div class="w-[1027px] h-[600px] overflow-auto flex justify-center">
    <div class="h-[1100px] flex w-[929px] flex-col gap-[22px]">
      <TextInput
        :value="title"
        label="콘텐츠명"
        event-name="title-input"
        height="49px"
        @title-input="handleTitleInput"
      ></TextInput>
      <TextInput
        :value="url"
        label="URL"
        event-name="url-input"
        height="49px"
        @title-input="handleURLInput"
      ></TextInput>
      <div class="flex flex-col gap-[12px]">
        <label class="font-bold">썸네일</label>
        <DragDrop @file-drop="handleFileDrop"></DragDrop>
      </div>
      <FilterInput
        event-name="add-filter"
        label="필터"
        @add-filter="handleAddFilter"
      ></FilterInput>
      <div>
        <div v-for="filter in filterList" :key="filter">
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
        height="500px"
        @title-input="handleDescriptionInput"
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
  </div>
</template>
<script lang="ts">
import { CLOSE_MODAL_EVENT } from '@/constants'
import DefaultButton from '../atom/DefaultButton.vue'
import TextArea from '../molecule/TextArea.vue'
import TextInput from '../molecule/TextInput.vue'
import DragDrop from '../molecule/DragDrop.vue'
import FilterInput from '../molecule/FilterInput.vue'

export default {
  components: { TextInput, TextArea, DefaultButton, DragDrop, FilterInput },
  data() {
    return {
      title: '',
      url: '',
      thumbnail: null as File | null,
      filterList: [] as string[],
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
    handleURLInput(value: string) {
      this.url = value
    },
    handleAddFilter(value: string) {
      this.filterList.push(value)
    },
    handleFileDrop(value: File) {
      this.thumbnail = value
    },
    handleSubmitForm() {
      console.log('submit')
    },
  },
}
</script>
<style lang="scss"></style>
