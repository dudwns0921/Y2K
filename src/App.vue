<template>
  <HeaderComponent
    @open-login-modal="openLoginModal"
    @open-form-modal="openFormModal"
  ></HeaderComponent>
  <RouterView />
  <LoginModal v-if="isLoginModalVisible" @close-modal="handleCloseModal" />
  <FormModal v-if="isFormModalVisible" @close-modal="handleCloseModal" />
</template>

<script lang="ts">
import HeaderComponent from './components/organism/HeaderComponent.vue'
import { RouterView } from 'vue-router'
import LoginModal from './components/organism/modal/LoginModal.vue'
import FormModal from './components/organism/modal/FormModal.vue'
export default {
  components: {
    HeaderComponent,
    RouterView,
    LoginModal,
    FormModal,
  },
  data() {
    return { isLoginModalVisible: false, isFormModalVisible: false }
  },
  methods: {
    openLoginModal() {
      this.isLoginModalVisible = true
    },
    openFormModal() {
      this.isFormModalVisible = true
    },
    handleCloseModal() {
      this.isLoginModalVisible = false
      this.isFormModalVisible = false
    },
  },
}
</script>
