<template>
  <div class="flex gap-2">
    <template v-if="!isContentStoreProcessing">
      <FilterComponent
        v-for="filter in filters"
        :key="filter"
        :content="filter"
      ></FilterComponent>
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
import FilterComponent from '../molecule/FilterComponent.vue'
import FilterSkeleton from '../atom/skleton/FilterSkeleton.vue'
import { useContentStore } from '@/stores/content'

export default {
  components: { FilterComponent, FilterSkeleton },
  computed: {
    ...mapState(useContentStore, ['filters', 'isContentStoreProcessing']),
  },
}
</script>
