<template>
  <div class="w-full h-full">
    <PopupOverlayComponent></PopupOverlayComponent>
    <PopupComponent
      width="383px"
      height="140px"
      :content="content"
      :buttons="buttons"
    ></PopupComponent>
  </div>
</template>
<script lang="ts">
import PopupComponent from '@/components/molecule/PopupComponent.vue'
import PopupOverlayComponent from '@/components/molecule/PopupOverlayComponent.vue'
export default {
  components: {
    PopupComponent,
    PopupOverlayComponent,
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log(this.content)
  },
}
</script>
<style lang="scss"></style>
