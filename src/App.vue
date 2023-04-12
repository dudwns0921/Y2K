<template>
  <HeaderComponent
    @open-login-modal="openLoginModal"
    @open-form-modal="openFormModal"
  ></HeaderComponent>
  <main class="pt-header">
    <RouterView />
  </main>
  <LoginModal v-if="isLoginModalVisible" @close-modal="handleCloseLoginModal" />
  <FormModal v-if="isFormModalVisible" @close-modal="handleCloseFormModal" />
</template>

<script lang="ts">
import HeaderComponent from './components/organism/HeaderComponent.vue'
import { RouterView } from 'vue-router'
import LoginModal from './components/organism/modal/LoginModal.vue'
import FormModal from './components/organism/modal/FormModal.vue'
import { mapState } from 'pinia'
import { useContentStore } from './stores/content'

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
  computed: {
    ...mapState(useContentStore, ['isContentDetailOpen']),
  },
  created() {
    window.addEventListener('scroll', this.handleContentDetailScrolled)
  },
  methods: {
    openLoginModal() {
      this.isLoginModalVisible = true
    },
    openFormModal() {
      this.isFormModalVisible = true
    },
    handleCloseLoginModal() {
      this.isLoginModalVisible = false
    },
    handleCloseFormModal() {
      this.isFormModalVisible = false
    },
    handleContentDetailScrolled() {
      if (this.isContentDetailOpen) {
        useContentStore().$state.isContentDetailOpen = false
      }
    },
  },
}
</script>
