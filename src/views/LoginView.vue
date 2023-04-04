<template>
  <div>
    <h1>This is a Login page</h1>
    <button @click="login">Google Login</button>
  </div>
</template>
<script lang="ts">
import { requestSignInWithPopup } from '@/api'
import { TOKEN_KEY } from '@/constants'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

export default {
  methods: {
    async login() {
      const result = await requestSignInWithPopup()
      if (result && result.token) {
        localStorage.setItem(TOKEN_KEY, result.token || '')
        authStore.token = result.token
      }
      window.location.replace('/')
    },
  },
}
</script>
<style></style>
