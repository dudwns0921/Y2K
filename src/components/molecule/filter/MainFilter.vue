<template>
  <div
    class="flex justify-center items-center h-[60px] p-[20px] rounded-sm cursor-pointer"
    :class="selectedClass"
    @click="changeIsSelected"
  >
    <p>{{ filter }}</p>
  </div>
</template>
<script lang="ts">
import { useContentStore } from '@/stores/content'
import { mapActions } from 'pinia'

export default {
  props: {
    filter: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isSelected: false,
    }
  },
  computed: {
    selectedClass() {
      if (this.isSelected) {
        return 'bg-darkGray text-white'
      } else {
        return 'bg-lightGray'
      }
    },
  },
  methods: {
    ...mapActions(useContentStore, ['addSelectedFilter', 'removeFilter']),
    changeIsSelected() {
      this.isSelected = !this.isSelected
      if (this.isSelected) {
        this.addSelectedFilter(this.filter)
      } else {
        this.removeFilter(this.filter)
      }
    },
  },
}
</script>
