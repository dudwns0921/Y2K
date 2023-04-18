<template>
  <div>
    <OverlayComponentVue @close-modal="handleCloseModal"> </OverlayComponentVue>
    <ModalComponent @close-modal="handleCloseModal">
      <FormComponent @close-modal="handleCloseModal"></FormComponent>
    </ModalComponent>
  </div>
</template>
<script lang="ts">
import ModalComponent from '@/components/molecule/ModalComponent.vue'
import OverlayComponentVue from '@/components/molecule/OverlayComponent.vue'
import { CLOSE_MODAL_EVENT } from '@/constants'
import FormComponent from '../FormComponent.vue'

export default {
  components: {
    OverlayComponentVue,
    ModalComponent,
    FormComponent,
  },
  methods: {
    handleCloseModal() {
      this.$emit(CLOSE_MODAL_EVENT)
    },
  },
}
</script>
