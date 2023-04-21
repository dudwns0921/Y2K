<template>
  <div class="flex gap-2">
    <template v-if="!isContentStoreProcessing">
      <MainFilter
        v-for="filter in filters"
        :key="filter"
        :filter="filter"
      ></MainFilter>
    </template>
    <template v-else>
      <FilterSkeleton
        v-for="dummy in ['1', '2', '3']"
        :key="dummy"
      ></FilterSkeleton>
    </template>
  </div>
</template>
<script lang="ts">
import { mapState } from 'pinia'
import FilterSkeleton from '../atom/skleton/FilterSkeleton.vue'
import { useContentStore } from '@/stores/content'
import MainFilter from '../molecule/filter/MainFilter.vue'

export default {
  components: { FilterSkeleton, MainFilter },
  computed: {
    ...mapState(useContentStore, ['filters', 'isContentStoreProcessing']),
  },
}
</script>
