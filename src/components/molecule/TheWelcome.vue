<template>
  <div>{{ WelcomeText }}</div>
</template>
<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { mapState } from 'pinia'
export default {
  computed: {
    WelcomeText() {
      return this.token ? 'Welcome back!' : "Hello! It's nice to meet you"
    },
    ...mapState(useAuthStore, ['token']),
  },
  created() {},
}
</script>
<style lang="scss" scoped></style>
