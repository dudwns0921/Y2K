<template>
  <div class="flex flex-col gap-[12px] relative">
    <label v-if="label" :for="label" class="font-bold">{{ label }}</label>
    <div
      class="border border-black flex items-center p-[9px] gap-[12px]"
      :style="inputDynamicStyle"
    >
      <input
        :id="label"
        type="text"
        :value="value"
        class="focus:outline-none w-full"
        @input="handleInput"
      />
      <DefaultButton height="35px" width="81px" @click="registerButtonAction">{{
        registerButtonText
      }}</DefaultButton>
    </div>
  </div>
  <ErrorDisplay :error="urlValidateError"></ErrorDisplay>
</template>

<script lang="ts">
import DefaultButton from '@/components/atom/DefaultButton.vue'
import {
  VIDEO_URL_VALIDATION_DONE_EVENT,
  VIDEO_URL_VALIDATION_FOR_UPDATE_DONE_EVENT,
  VIDEO_URL_VALIDATION_RESET_EVENT,
} from '@/constants'
import { validateYouTubeUrl } from '@/util/youtube'
import ErrorDisplay from '../ErrorDisplay.vue'

export default {
  components: { DefaultButton, ErrorDisplay },
  props: {
    value: { type: String, required: true },
    label: { type: String, default: '' },
    eventName: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    needEnterKey: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      urlValidateError: {} as Error,
      isUrlValidated: false,
    }
  },
  computed: {
    inputDynamicStyle() {
      return {
        width: this.width,
        height: this.height,
      }
    },
    registerButtonText() {
      return this.isUrlValidated ? '삭제' : '등록'
    },
    registerButtonAction() {
      if (this.registerButtonText === '등록') {
        return this.validateURL
      } else {
        return this.deleteURL
      }
    },
  },
  mounted() {
    this.$emitter.on(
      VIDEO_URL_VALIDATION_FOR_UPDATE_DONE_EVENT,
      this.handleVideoURLValidationForUpdateDone
    )
  },
  unmounted() {
    this.$emitter.off(
      VIDEO_URL_VALIDATION_FOR_UPDATE_DONE_EVENT,
      this.handleVideoURLValidationForUpdateDone
    )
  },
  methods: {
    handleVideoURLValidationForUpdateDone() {
      this.isUrlValidated = true
    },
    validateURL() {
      try {
        if (validateYouTubeUrl(this.value)) {
          if (this.urlValidateError.message) {
            this.urlValidateError = {} as Error
          }
          this.isUrlValidated = true
          this.$emit(VIDEO_URL_VALIDATION_DONE_EVENT)
        } else {
          throw new Error('URL 주소를 확인하세요.')
        }
      } catch (error) {
        this.urlValidateError = error as Error
      }
    },
    deleteURL() {
      this.$emit(this.eventName, '')
      this.isUrlValidated = false
      this.$emit(VIDEO_URL_VALIDATION_RESET_EVENT)
    },
    handleInput(event: Event) {
      const eventTarget = event.target as HTMLInputElement
      this.$emit(this.eventName, eventTarget.value)
    },
  },
}
</script>
