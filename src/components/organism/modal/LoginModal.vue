<template>
  <div>
    <OverlayComponent @close-modal="handleCloseModal"> </OverlayComponent>
    <ModalComponent @close-modal="handleCloseModal">
      <div class="flex flex-col justify-center items-center w-full h-full">
        <p
          class="text-[40px] font-bold flex justify-center tracking-[19px] mb-[40px]"
        >
          PASSWOR<span class="tracking-normal">D</span>
        </p>
        <div
          class="flex h-[49px] items-center gap-[12px]"
          :class="{ 'animate-vibrate': error }"
        >
          <TextInput
            :value="password"
            width="263px"
            event-name="password-input"
            :need-enter-key="true"
            @press-enter="handlePressEnter"
            @password-input="handleTextInput"
          ></TextInput>
          <button @click="handleLogin">
            <PolygonIcon />
          </button>
        </div>
        <ErrorDisplay :error="error"></ErrorDisplay>
      </div>
    </ModalComponent>
  </div>
</template>
<script lang="ts">
import ModalComponent from '@/components/molecule/ModalComponent.vue'
import OverlayComponent from '@/components/molecule/OverlayComponent.vue'
import { requestSignInWithPopup } from '@/api/firebase/auth'
import { CLOSE_MODAL_EVENT, TOKEN_KEY } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import TextInput from '../../molecule/TextInput.vue'
import ErrorDisplay from '../../molecule/ErrorDisplay.vue'
import PolygonIcon from '@/components/icon/PolygonIcon.vue'

const { VITE_ADMIN_PASSWORD } = import.meta.env

export default {
  components: {
    OverlayComponent,
    ModalComponent,
    TextInput,
    ErrorDisplay,
    PolygonIcon,
  },
  data() {
    return {
      password: '',
      error: {} as Error,
    }
  },
  methods: {
    async handleLogin() {
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
          throw new Error('비밀번호를 확인하세요.')
        }
      } catch (error) {
        if (error instanceof Error) {
          this.error = error
        }
      }
    },

    handleCloseModal() {
      this.$emit(CLOSE_MODAL_EVENT)
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
    handlePressEnter() {
      this.handleLogin()
    },
  },
}
</script>
