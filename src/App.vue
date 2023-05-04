<template>
  <HeaderComponent
    @open-login-modal="openLoginModal"
    @open-form-modal="openFormModal"
  ></HeaderComponent>
  <main class="p-[24px] pt-header">
    <RouterView @update-content="handleUpdateContent" />
  </main>
  <LoginModal v-if="isLoginModalVisible" @close-modal="handleCloseLoginModal" />
  <FormModal
    v-if="isFormModalVisible"
    :content-data-for-update="contentDataForUpdate"
    @close-modal="handleCloseFormModal"
  />
</template>

<script lang="ts">
import HeaderComponent from './components/organism/HeaderComponent.vue'
import { RouterView } from 'vue-router'
import LoginModal from './components/organism/modal/LoginModal.vue'
import FormModal from './components/organism/modal/FormModal.vue'
import { mapState } from 'pinia'
import { useContentStore } from './stores/content'
import type { ContentData } from './types/content'
import { Popup } from './util/popup/Popup'

export default {
  components: {
    HeaderComponent,
    RouterView,
    LoginModal,
    FormModal,
  },
  data() {
    return {
      isLoginModalVisible: false,
      isFormModalVisible: false,
      contentDataForUpdate: {} as ContentData,
    }
  },
  computed: {
    ...mapState(useContentStore, ['isContentDetailOpen']),
  },
  methods: {
    openLoginModal() {
      this.isLoginModalVisible = true
    },
    openFormModal() {
      this.isFormModalVisible = true
      this.contentDataForUpdate = {} as ContentData
    },
    handleCloseLoginModal() {
      this.isLoginModalVisible = false
    },
    handleCloseFormModal(isFormWorking: boolean) {
      if (isFormWorking) {
        const popup = Popup.getInstance()
        popup.show(
          '변경사항이 저장되지 않습니다.<br /> 계속 하시겠습니까?',
          [
            {
              title: '예',
              callback: () => {
                this.isFormModalVisible = false
              },
            },
            {
              title: '아니오',
              callback: () => {
                popup.closePopup()
              },
            },
          ],
          'formModal'
        )
      } else {
        this.isFormModalVisible = false
      }
    },
    handleUpdateContent(content: ContentData) {
      if (Object.keys(content).length !== 0) {
        this.contentDataForUpdate = content
        this.isFormModalVisible = true
      }
    },
  },
}
</script>
