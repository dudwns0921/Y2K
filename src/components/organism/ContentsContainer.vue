<template>
  <div class="flex flex-col gap-[20px]">
    <template v-if="!isContentLoading">
      <ContentCard
        v-for="content in contents"
        :key="content.id"
        :title="content.title"
        :thumbnail-url="content.thumbnailURL"
        @open-content-detail="openContentDetail(content)"
        @delete-content="handleDeleteContent(content.id)"
      ></ContentCard>
    </template>
    <template v-else>
      <ContentCardSkeleton
        v-for="dummy in ['1', '2', '3']"
        :key="dummy"
      ></ContentCardSkeleton>
    </template>
  </div>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'
import ContentCard from '../molecule/ContentCard.vue'
import { useContentStore } from '@/stores/content'
import ContentCardSkeleton from '../atom/skleton/ContentCardSkeleton.vue'
import { deleteContent } from '@/api/firebase/database'

export default {
  components: { ContentCard, ContentCardSkeleton },
  computed: {
    ...mapState(useContentStore, ['contents', 'isContentLoading']),
  },
  methods: {
    ...mapActions(useContentStore, ['openContentDetail']),
    async handleDeleteContent(contentId: string) {
      await deleteContent(contentId)
      window.location.reload()
    },
  },
}
</script>
