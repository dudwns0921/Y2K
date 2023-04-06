<template>
  <HeaderComponent @open_login_modal="openLoginModal"></HeaderComponent>
  <RouterView />
  <LoginModal v-if="isLoginModalVisible" @close="close" />
</template>

<script lang="ts">
import HeaderComponent from './components/organism/HeaderComponent.vue'
import { RouterView } from 'vue-router'
import LoginModal from './components/organism/LoginModal.vue'
export default {
  components: {
    HeaderComponent,
    RouterView,
    LoginModal,
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
