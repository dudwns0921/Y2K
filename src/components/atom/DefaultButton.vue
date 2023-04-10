<template>
  <button :class="[buttonClass, buttonHoverClass]" @click="handleClick">
    <slot></slot>
  </button>
</template>
<script lang="ts">
export default {
  props: {
    eventName: {
      type: String,
      required: true,
    },
  },
  computed: {
    buttonClass() {
      return 'flex justify-center items-center h-[60px] px-[11px] min-w-[142px] max-w-max border border-black font-bold text-darkGray rounded'
    },
    buttonHoverClass() {
      return 'hover:bg-darkGray hover:text-white hover:border-none'
    },
  },
  methods: {
    handleClick() {
      this.$emit(this.eventName)
    },
  },
}
</script>
