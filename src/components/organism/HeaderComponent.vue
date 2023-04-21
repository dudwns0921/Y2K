<template>
  <header class="fixed bg-mainBG w-full h-header z-10">
    <nav class="flex gap-2 p-[26px] justify-between">
      <RouterLink to="/">홈 로고</RouterLink>
      <div>
        <DefaultButton v-if="!token" @click="handleOpenLoginModal"
          >로그인</DefaultButton
        >
        <div v-else class="flex gap-2">
          <DefaultButton @click="getDeleteHandler">{{
            getDeleteText
          }}</DefaultButton>
          <DefaultButton
            v-if="isDeleteSelectionMode"
            @click="cancelDeleteSelectionMode"
            >취소</DefaultButton
          >
          <DefaultButton @click="handleOpenFormModal"
            >콘텐츠 업로드</DefaultButton
          >
          <DefaultButton @click="handleLogout">로그아웃</DefaultButton>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { requestSignOut } from '@/api/firebase/auth'
import {
  OPEN_FORM_MODAL_EVENT,
  OPEN_LOGIN_MODAL_EVENT,
  RUN_DELETE_SELECTION_MODE_EVENT,
  CANCEL_DELETE_SELECTION_MODE_EVENT,
  DELETE_SELECTION_EVENT,
} from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import DefaultButton from '../atom/DefaultButton.vue'
export default {
  components: {
    RouterLink,
    DefaultButton,
  },
  data() {
    return {
      isDeleteSelectionMode: false,
    }
  },
  computed: {
    ...mapState(useAuthStore, ['token']),
    getDeleteHandler(): () => void {
      if (this.isDeleteSelectionMode) {
        return this.emitDeleteSelectionEvent
      } else {
        return this.runDeleteSelectionMode
      }
    },
    getDeleteText(): string {
      return this.isDeleteSelectionMode ? '삭제' : ' 선택 삭제'
    },
  },
  methods: {
    handleOpenFormModal(): void {
      this.$emit(OPEN_FORM_MODAL_EVENT)
    },
    handleOpenLoginModal(): void {
      this.$emit(OPEN_LOGIN_MODAL_EVENT)
    },
    handleLogout(): void {
      requestSignOut()
    },
    runDeleteSelectionMode(): void {
      this.isDeleteSelectionMode = true
      this.$emitter.emit(RUN_DELETE_SELECTION_MODE_EVENT)
    },
    emitDeleteSelectionEvent(): void {
      this.$emitter.emit(DELETE_SELECTION_EVENT)
    },
    cancelDeleteSelectionMode(): void {
      this.isDeleteSelectionMode = false
      this.$emitter.emit(CANCEL_DELETE_SELECTION_MODE_EVENT)
    },
  },
}
</script>
<style lang="scss">
span {
  cursor: pointer;
}
</style>
