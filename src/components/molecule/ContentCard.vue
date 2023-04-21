<template>
  <div v-if="isFiltered" class="w-[350px] min-h-max">
    <p class="text-white">{{ title }}</p>
    <div class="w-full relative">
      <img
        :src="thumbnailUrl"
        class="h-[217px] border border-pointColor rounded-lg"
        @click="emitOpenContentDetailEvent"
      />
      <button
        ref="detailedMenuButton"
        class="absolute top-[10px] right-[10px]"
        @click="handleDetailedMenuStatus"
      >
        세부 메뉴
      </button>
      <div
        v-if="isDetailedMenuClicked"
        ref="detailedMenu"
        class="absolute top-[40px] right-[10px] bg-lightGray w-[63px] flex flex-col items-center border border-black p-[10px]"
      >
        <p class="cursor-pointer" @click="emitUpdateContentEvent">수정</p>
        <p class="cursor-pointer" @click="emitDeleteContentEvent">삭제</p>
      </div>
      <div
        v-if="isDeleteMode"
        class="absolute top-[10px] left-[10px] cursor-pointer"
      >
        <SelectCircle
          v-if="!isCheckedForDeletion"
          @click="checkForDeletion"
        ></SelectCircle>
        <SelectedCircle v-else @click="cancelCheckForDeletion"></SelectedCircle>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  OPEN_CONTENT_DETAIL_EVENT,
  DELETE_CONTENT_EVENT,
  UPDATE_CONTENT_EVENT,
  RUN_DELETE_SELECTION_MODE_EVENT,
  CANCEL_DELETE_SELECTION_MODE_EVENT,
  DELETE_SELECTION_EVENT,
  CHECK_FOR_DELETION_EVENT,
  CANCEL_CHECK_FOR_DELETION_EVENT,
} from '@/constants'
import SelectCircle from '../icon/SelectCircle.vue'
import SelectedCircle from '../icon/SelectedCircle.vue'
import { mapState } from 'pinia'
import { useContentStore } from '@/stores/content'
export default {
  components: { SelectCircle, SelectedCircle },
  props: {
    title: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDetailedMenuClicked: false,
      isDeleteMode: false,
      isCheckedForDeletion: false,
    }
  },
  computed: {
    ...mapState(useContentStore, ['selectedFilters']),
    isFiltered() {
      // true - 필터링에 포함됨
      if (this.selectedFilters.length === 0) {
        return true
      } else {
        return this.filters.some((filter) =>
          this.selectedFilters.includes(filter as string)
        )
      }
    },
  },
  mounted() {
    this.$emitter.on(
      RUN_DELETE_SELECTION_MODE_EVENT,
      this.handleRunDeleteSelectionMode
    )
    this.$emitter.on(
      CANCEL_DELETE_SELECTION_MODE_EVENT,
      this.handleCancelDeleteSelectionMode
    )
    this.$emitter.on(DELETE_SELECTION_EVENT, this.handelDeleteSelection)
  },
  unmounted() {
    this.$emitter.off(
      RUN_DELETE_SELECTION_MODE_EVENT,
      this.handleRunDeleteSelectionMode
    )
    this.$emitter.off(
      CANCEL_DELETE_SELECTION_MODE_EVENT,
      this.handleCancelDeleteSelectionMode
    )
    this.$emitter.off(DELETE_SELECTION_EVENT, this.handelDeleteSelection)
  },
  methods: {
    emitOpenContentDetailEvent() {
      this.$emit(OPEN_CONTENT_DETAIL_EVENT)
    },
    emitDeleteContentEvent() {
      this.$emit(DELETE_CONTENT_EVENT)
    },
    emitUpdateContentEvent() {
      this.$emit(UPDATE_CONTENT_EVENT)
    },
    handleDetailedMenuStatus() {
      this.isDetailedMenuClicked = !this.isDetailedMenuClicked
      if (this.isDetailedMenuClicked) {
        document.addEventListener('click', this.handleDetiledMenuOutsideClick)
      } else {
        document.removeEventListener(
          'click',
          this.handleDetiledMenuOutsideClick
        )
      }
    },
    handleDetiledMenuOutsideClick(event: MouseEvent) {
      const detailedMenuButton = this.$refs
        .detailedMenuButton as HTMLButtonElement
      if (!detailedMenuButton.contains(event.target as Node)) {
        // 세부 메뉴 버튼 눌렀을 때
        if (this.isDetailedMenuClicked) {
          this.isDetailedMenuClicked = false
        }
      }
    },
    handleRunDeleteSelectionMode() {
      this.isDeleteMode = true
    },
    handleCancelDeleteSelectionMode() {
      this.isCheckedForDeletion = false
      this.isDeleteMode = false
    },
    handelDeleteSelection() {
      if (this.isCheckedForDeletion) {
        this.$emit(DELETE_SELECTION_EVENT)
      }
    },
    checkForDeletion() {
      this.isCheckedForDeletion = true
      this.$emit(CHECK_FOR_DELETION_EVENT)
    },
    cancelCheckForDeletion() {
      this.isCheckedForDeletion = false
      this.$emit(CANCEL_CHECK_FOR_DELETION_EVENT)
    },
  },
}
</script>
