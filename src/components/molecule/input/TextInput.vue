<template>
  <div class="flex flex-col gap-[12px]">
    <label v-if="label" :for="label" class="font-bold">{{ label }}</label>
    <input
      :id="label"
      type="text"
      :value="value"
      class="border border-black focus:outline-none p-[9px]"
      :style="inputDynamicStyle"
      @input="handleInput"
      @keyup.enter="handlePressEnter"
    />
  </div>
</template>

<script lang="ts">
import { PRESS_ENTER_EVENT } from '@/constants'

export default {
  name: 'TextInput',
  props: {
    value: { type: String, required: true },
    label: { type: String, required: false, default: '' },
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
  computed: {
    inputDynamicStyle() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
  methods: {
    handleInput(event: Event) {
      const eventTarget = event.target as HTMLInputElement
      this.$emit(this.eventName, eventTarget.value)
    },
    handlePressEnter() {
      if (this.needEnterKey) {
        this.$emit(PRESS_ENTER_EVENT)
      }
    },
  },
}
</script>
