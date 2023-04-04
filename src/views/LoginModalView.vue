<template>
  <div>
    <OverlayComponentVue> </OverlayComponentVue>
    <ModalComponent title="로그인창" content="내용 어쩌구저쩌구">
      <BasicButton
        title="login"
        event-name="login"
        @login="login"
      ></BasicButton>
      <BasicButton
        title="close"
        event-name="close"
        @close="close"
      ></BasicButton>
    </ModalComponent>
  </div>
</template>
<script lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import OverlayComponentVue from '@/components/OverlayComponent.vue'
import { requestSignInWithPopup } from '@/api'
import { TOKEN_KEY } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import BasicButton from '@/components/BasicButton.vue'

export default {
  components: {
    OverlayComponentVue,
    ModalComponent,
    BasicButton,
  },
  methods: {
    async login() {
      const result = await requestSignInWithPopup()
      if (result && result.token) {
        localStorage.setItem(TOKEN_KEY, result.token || '')
        useAuthStore().token = result.token
      }
      window.location.replace('/')
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
