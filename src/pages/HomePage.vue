<template>
  <div class="grid gap-[49px]">
    <ContentDetail></ContentDetail>
    <FilterBar></FilterBar>
    <SortBy class="justify-self-end"></SortBy
    ><ContentsContainer
      @update-content="handleUpdateContent"
    ></ContentsContainer>
  </div>
</template>

<script lang="ts">
import ContentDetail from '@/components/organism/ContentDetail.vue'
import ContentsContainer from '@/components/organism/ContentsContainer.vue'
import FilterBar from '@/components/organism/FilterBar.vue'
import SortBy from '@/components/organism/SortBy.vue'
import { UPDATE_CONTENT_EVENT } from '@/constants'
import { useContentStore } from '@/stores/content'
import type { ContentData } from '@/types/content'
import { mapActions } from 'pinia'
export default {
  components: {
    FilterBar,
    ContentsContainer,
    ContentDetail,
    SortBy,
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
    handleUpdateContent(content: ContentData) {
      this.$emit(UPDATE_CONTENT_EVENT, content)
    },
  },
}
</script>
