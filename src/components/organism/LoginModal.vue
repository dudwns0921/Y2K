<template>
  <div>
    <OverlayComponentVue> </OverlayComponentVue>
    <ModalComponent title="Administrator Login" :content="AdminMessage">
      <TextInput
        :value="password"
        label="비밀번호"
        @text-input="handleTextInput"
      ></TextInput>
      <ErrorDisplay :error="error"></ErrorDisplay>
      <div class="flex gap-5">
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
      </div>
    </ModalComponent>
  </div>
</template>
<script lang="ts">
import ModalComponent from '@/components/molecule/ModalComponent.vue'
import OverlayComponentVue from '@/components/atom/OverlayComponent.vue'
import { requestSignInWithPopup } from '@/api'
import { ADMIN_EMAIL, TOKEN_KEY } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import BasicButton from '@/components/atom/DefaultButton.vue'
import TextInput from '../molecule/TextInput.vue'
import ErrorDisplay from '../atom/ErrorDisplay.vue'

const { VITE_ADMIN_PASSWORD } = import.meta.env

export default {
  components: {
    OverlayComponentVue,
    ModalComponent,
    BasicButton,
    TextInput,
    ErrorDisplay,
  },
  data() {
    return {
      password: '',
      error: {} as Error,
    }
  },
  computed: {
    AdminMessage() {
      return `관리자만 로그인할 수 있습니다. \n비밀번호는 ${ADMIN_EMAIL}로 문의 부탁드립니다.`
    },
  },
  methods: {
    async login() {
      try {
        if (this.password === VITE_ADMIN_PASSWORD) {
          if (this.error) {
            this.error = {
              name: '',
              message: '',
            }
          }
          const result = await requestSignInWithPopup()
          if (result && result.token) {
            localStorage.setItem(TOKEN_KEY, result.token || '')
            useAuthStore().token = result.token
          }
          window.location.replace('/')
        } else {
          throw new Error('잘못된 비밀번호입니다.')
        }
      } catch (error) {
        if (error instanceof Error) {
          this.error = error
        }
      }
    },
    close() {
      this.$emit('close')
    },
    handleTextInput(value: string) {
      this.password = value
      if (this.password === '') {
        this.error = {
          name: '',
          message: '',
        }
      }
    },
  },
}
</script>
