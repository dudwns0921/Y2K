<template>
  <div class="flex gap-2">
    <template v-if="!isFilterLoading">
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
import { useFilterStore } from '@/stores/filter'
import FilterSkeleton from '../atom/skleton/FilterSkeleton.vue'

export default {
  components: { FilterComponent, FilterSkeleton },
  computed: {
    ...mapState(useFilterStore, ['filters', 'isFilterLoading']),
  },
}
</script>
