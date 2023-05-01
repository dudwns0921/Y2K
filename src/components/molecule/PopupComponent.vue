<template>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white justify-center z-50 flex flex-col items-center min-w-max min-h-max gap-[16px]"
    :style="modalPopupStyle"
  >
    <p class="text-center" v-html="content"></p>
    <div class="flex gap-[16px]">
      <DefaultButton
        v-for="button in buttons as popupButtonObj[]"
        :key="button.title"
        width="93px"
        height="33px"
        @click="button.callback"
        >{{ button.title }}</DefaultButton
      >
    </div>
  </div>
</template>
<script lang="ts">
import type { popupButtonObj } from '@/util/popup/Popup'
import DefaultButton from '../atom/DefaultButton.vue'

export default {
  components: { DefaultButton },
  props: {
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      required: true,
    },
  },
  computed: {
    modalPopupStyle() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
}
</script>
