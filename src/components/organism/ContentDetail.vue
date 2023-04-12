<template>
  <div
    class="w-full bg-blue-200 transition-height duration-500 ease-out grid grid-cols-10 overflow-hidden"
    :class="[isContentDetailOpen ? 'h-[655px]' : 'h-0']"
  >
    <div class="col-span-7 bg-gray-500"></div>
    <div class="col-span-3">
      <p>{{ currentDetailContent?.title }}</p>
      <ul>
        <li v-for="filter in currentDetailContent?.filters" :key="filter">
          {{ filter }}
        </li>
      </ul>
      <p>{{ currentDetailContent?.description }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { useContentStore } from '@/stores/content'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useContentStore, [
      'isContentDetailOpen',
      'currentDetailContent',
    ]),
  },
}
</script>
