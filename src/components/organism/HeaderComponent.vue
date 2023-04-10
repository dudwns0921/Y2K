<template>
  <header>
    <nav class="bg-blue-500 flex gap-2">
      <RouterLink to="/">홈</RouterLink>
      <span v-if="!token" @click="openLoginModal">로그인</span>
      <div v-else class="flex gap-2">
        <span @click="openFormModal">입력하기</span
        ><span @click="logout">로그아웃</span>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { requestSignOut } from '@/api'
import {
  OPEN_FORM_MODAL_EVENT,
  OPEN_LOGIN_MODAL_EVENT,
  TOKEN_KEY,
} from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { mapState } from 'pinia'
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(useAuthStore, ['token']),
  },
  methods: {
    openFormModal() {
      this.$emit(OPEN_FORM_MODAL_EVENT)
    },
    openLoginModal() {
      this.$emit(OPEN_LOGIN_MODAL_EVENT)
    },
    logout() {
      requestSignOut()
      localStorage.removeItem(TOKEN_KEY)
      window.location.replace('/')
    },
  },
}
</script>
<style lang="scss">
span {
  cursor: pointer;
}
</style>
