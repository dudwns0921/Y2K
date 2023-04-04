<script lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import { RouterView } from 'vue-router'
import LoginModalView from './views/LoginModalView.vue'
export default {
  components: {
    HeaderComponent,
    RouterView,
    LoginModalView,
  },
  data() {
    return { isLoginModalVisible: false }
  },
  methods: {
    openLoginModal() {
      this.isLoginModalVisible = true
    },
    close() {
      this.isLoginModalVisible = false
    },
  },
}
</script>

<template>
  <HeaderComponent @open_login_modal="openLoginModal"></HeaderComponent>
  <RouterView />
  <LoginModalView v-if="isLoginModalVisible" @close="close" />
</template>

<style lang="sccs" scoped></style>
