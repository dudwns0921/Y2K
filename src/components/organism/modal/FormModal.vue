<template>
  <div>
    <ModalOverlayComponent @close-modal="handleCloseModal">
    </ModalOverlayComponent>
    <ModalComponent
      id="formModal"
      width="1027px"
      height="600px"
      @close-modal="handleCloseModal"
      @check-is-form-working="handleCheckIsFormWorking"
    >
      <FormComponent
        :content-data-for-update="contentDataForUpdate"
        @close-modal="handleCloseModal"
        @check-is-form-working="handleCheckIsFormWorking"
      ></FormComponent>
    </ModalComponent>
  </div>
</template>
<script lang="ts">
import ModalComponent from '@/components/molecule/ModalComponent.vue'
import { CLOSE_MODAL_EVENT, CHECK_IS_FORM_WORKING_EVENT } from '@/constants'
import FormComponent from '../FormComponent.vue'
import ModalOverlayComponent from '@/components/molecule/ModalOverlayComponent.vue'

export default {
  components: {
    ModalComponent,
    FormComponent,
    ModalOverlayComponent,
  },
  props: {
    contentDataForUpdate: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleCheckIsFormWorking(isFormWorking: boolean) {
      this.$emit(CLOSE_MODAL_EVENT, isFormWorking)
    },
    handleCloseModal() {
      // FormComponent에서 작성중인지 확인 요청
      this.$emitter.emit(CHECK_IS_FORM_WORKING_EVENT)
    },
  },
}
</script>
