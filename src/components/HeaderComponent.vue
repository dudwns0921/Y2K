<template>
  <header class="bg-blue-500">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <span v-if="!token" @click="openLoginModal">Login</span>
      <span v-else @click="logout">Logout</span>
    </nav>
  </header>
</template>
<script lang="ts">
import { requestSignOut } from '@/api'
import { OPEN_LOGIN_MODAL_EVENT, TOKEN_KEY } from '@/constants'
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
