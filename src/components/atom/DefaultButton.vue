<template>
  <button
    :class="[buttonDefaultClass, buttonHoverClass]"
    :style="buttonDynamicStyle"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
export default {
  props: {
    width: {
      type: String,
      default: '142px',
    },
    height: {
      type: String,
      default: '60px',
    },
  },
  computed: {
    buttonDefaultClass() {
      return `flex justify-center items-center p-[11px] border border-black font-bold text-darkGray rounded`
    },
    buttonDynamicStyle() {
      return {
        width: this.width,
        height: this.height,
      }
    },
    buttonHoverClass() {
      return 'hover:bg-darkGray hover:text-white hover:border-transparent'
    },
  },
}
</script>
