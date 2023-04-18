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
        ref="detailedMenuButton"
        class="absolute top-[10px] right-[10px] z-20"
      >
        세부 메뉴
      </button>
      <div
        v-if="isDetailedMenuClicked"
        ref="detailedMenu"
        class="absolute top-[40px] right-[10px] bg-lightGray w-[63px] flex flex-col items-center border border-black p-[10px] z-20"
      >
        <p class="cursor-pointer">수정</p>
        <p class="cursor-pointer" @click="emitDeleteContentEvent">삭제</p>
      </div>
    </div>
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
  mounted() {
    document.addEventListener('click', this.handleDetiledMenuOutsideClick)
  },
  unmounted() {
    document.removeEventListener('click', this.handleDetiledMenuOutsideClick)
  },
  methods: {
    emitOpenContentDetailEvent() {
      console.log('hi')
      this.$emit(OPEN_CONTENT_DETAIL_EVENT)
    },
    emitDeleteContentEvent() {
      this.$emit(DELETE_CONTENT_EVENT)
    },
    handleDetailedMenuStatus() {
      this.isDetailedMenuClicked = !this.isDetailedMenuClicked
    },
    handleDetiledMenuOutsideClick(event: MouseEvent) {
      const detailedMenuButton = this.$refs
        .detailedMenuButton as HTMLButtonElement
      if (detailedMenuButton.contains(event.target as Node)) {
        // 세부 메뉴 버튼 눌렀을 때
        this.handleDetailedMenuStatus()
      } else {
        // 그 외 영역 눌렀을 때
        if (this.isDetailedMenuClicked) {
          this.isDetailedMenuClicked = false
        }
      }
    },
  },
}
</script>
