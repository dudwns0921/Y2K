<template>
  <div class="flex flex-col gap-[12px]">
    <label v-if="label" :for="label" class="font-bold">{{ label }}</label>
    <input
      :id="label"
      type="text"
      :value="value"
      class="border border-black focus:outline-none p-[9px]"
      :class="inputClass"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
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
      default: 'full',
    },
    height: {
      type: String,
      default: 'full',
    },
  },
  computed: {
    inputClass() {
      let width = ''
      let height = ''
      if (this.width === 'full') {
        width = this.width
      } else {
        width = `[${this.width}]`
      }
      if (this.height === 'full') {
        height = this.height
      } else {
        height = `[${this.height}]`
      }
      return `w-${width} h-${height}`
    },
  },
  methods: {
    handleInput(event: Event) {
      const eventTarget = event.target as HTMLInputElement
      this.$emit(this.eventName, eventTarget.value)
    },
  },
}
</script>
