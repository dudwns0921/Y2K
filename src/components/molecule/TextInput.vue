<template>
  <label :for="label">{{ label }}:</label>
  <input
    :id="label"
    type="text"
    :value="value"
    class="border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    @input="handleInput"
  />
</template>

<script lang="ts">
export default {
  name: 'TextInput',
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  emits: ['text-input'],
  methods: {
    handleInput(event: Event) {
      const eventTarget = event.target as HTMLInputElement
      this.$emit('text-input', eventTarget.value)
    },
  },
}
</script>
