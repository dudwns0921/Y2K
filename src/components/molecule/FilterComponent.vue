<template>
  <div
    class="inline-block rounded-sm border border-black px-0.5 cursor-pointer"
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
