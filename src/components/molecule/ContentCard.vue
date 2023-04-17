<template>
  <div class="w-[350px] min-h-max">
    <p>{{ title }}</p>
    <div class="w-full relative">
      <img
        :src="thumbnailUrl"
        class="h-[217px]"
        @click="emitOpenContentDetailEvent"
      />
      <button
        class="absolute top-[10px] right-[10px] z-20"
        @click="openDetailedMenu"
      >
        세부 메뉴
      </button>
      <div
        v-if="isDetailedMenuClicked"
        class="absolute top-[40px] right-[10px] bg-lightGray w-[63px] flex flex-col items-center border border-black p-[10px] z-20"
      >
        <p class="cursor-pointer">수정</p>
        <p class="cursor-pointer" @click="emitDeleteContentEvent">삭제</p>
      </div>
    </div>
    <div
      v-if="isDetailedMenuClicked"
      class="fixed top-0 left-0 w-full h-full z-10"
      @click="openDetailedMenu"
    ></div>
  </div>
</template>
<script lang="ts">
import { OPEN_CONTENT_DETAIL_EVENT, DELETE_CONTENT_EVENT } from '@/constants'

export default {
  props: {
    title: {
      type: String,
      isRequired: true,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      isRequired: true,
      default: '',
    },
  },
  data() {
    return {
      isDetailedMenuClicked: false,
    }
  },
  methods: {
    emitOpenContentDetailEvent() {
      this.$emit(OPEN_CONTENT_DETAIL_EVENT)
    },
    emitDeleteContentEvent() {
      this.$emit(DELETE_CONTENT_EVENT)
    },
    openDetailedMenu() {
      this.isDetailedMenuClicked = !this.isDetailedMenuClicked
    },
  },
}
</script>
