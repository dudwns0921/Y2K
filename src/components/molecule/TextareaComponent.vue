<template>
  <div class="flex flex-col gap-[12px]">
    <label v-if="label" :for="label" class="font-bold">{{ label }}</label>
    <textarea
      :id="label"
      ref="textarea"
      :value="value"
      class="border border-black focus:outline-none p-[9px] resize-none w-full h-[203px]"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    value: { type: String, required: true },
    label: { type: String, required: false, default: '' },
    eventName: {
      type: String,
      required: true,
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
