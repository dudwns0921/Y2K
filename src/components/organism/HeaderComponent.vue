<template>
  <header class="fixed bg-white w-full h-header">
    <nav class="flex gap-2 p-[26px] justify-between">
      <RouterLink to="/">홈 로고</RouterLink>
      <div>
        <DefaultButton
          v-if="!token"
          event-name="open-login-modal"
          @open-login-modal="handleOpenLoginModal"
          >로그인</DefaultButton
        >
        <div v-else class="flex gap-2">
          <DefaultButton
            event-name="open-form-modal"
            @open-form-modal="handleOpenFormModal"
            >콘텐츠 업로드</DefaultButton
          >
          <DefaultButton event-name="logout" @logout="handleLogout"
            >로그아웃</DefaultButton
          >
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { requestSignOut } from '@/api/firebase/auth'
import { OPEN_FORM_MODAL_EVENT, OPEN_LOGIN_MODAL_EVENT } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import DefaultButton from '../atom/DefaultButton.vue'
export default {
  components: {
    RouterLink,
    DefaultButton,
  },
  computed: {
    ...mapState(useAuthStore, ['token']),
  },
  methods: {
    handleOpenFormModal() {
      this.$emit(OPEN_FORM_MODAL_EVENT)
    },
    handleOpenLoginModal() {
      this.$emit(OPEN_LOGIN_MODAL_EVENT)
    },
    handleLogout() {
      requestSignOut()
    },
  },
}
</script>
<style lang="scss">
span {
  cursor: pointer;
}
</style>
