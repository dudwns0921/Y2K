<template>
  <div class="flex flex-col gap-[49px]">
    <ContentDetail></ContentDetail>
    <FilterBar></FilterBar><ContentsContainer></ContentsContainer>
  </div>
</template>

<script lang="ts">
import ContentDetail from '@/components/organism/ContentDetail.vue'
import ContentsContainer from '@/components/organism/ContentsContainer.vue'
import FilterBar from '@/components/organism/FilterBar.vue'
import { useContentStore } from '@/stores/content'
import { mapActions } from 'pinia'
export default {
  components: {
    FilterBar,
    ContentsContainer,
    ContentDetail,
  },
  data() {
    return {
      isDetailPageOpened: false,
    }
  },
  created() {
    this.setContentsAndFilters()
  },

  methods: {
    ...mapActions(useContentStore, ['setContentsAndFilters']),
  },
}
</script>
