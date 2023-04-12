<template>
  <div
    class="inline-block rounded-sm cursor-pointer h-[60px] flex items-center justify-center p-[20px] bg-lightGray text-black"
    @click="addFilter(content)"
  >
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { useFilterStore } from '@/stores/filter'
import { mapActions } from 'pinia'

export default {
  name: 'TextBox',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(useFilterStore, ['addFilter']),
  },
}
</script>
