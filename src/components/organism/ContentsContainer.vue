<template>
  <div class="flex flex-col gap-[20px]">
    <template v-if="!isContentStoreProcessing">
      <ContentCard
        v-for="content in contents"
        :key="content.id"
        :title="content.title"
        :thumbnail-url="content.thumbnailURL"
        :filters="content.filters"
        @open-content-detail="openContentDetail(content)"
        @delete-content="handleDeleteContent(content.id)"
        @update-content="handleUpdateContent(content)"
        @check-for-deletion="handleCheckForDeletion(content.id)"
        @cancel-check-for-deletion="handleCancelCheckForDeletion(content.id)"
        @delete-selection="handleDeleteSelection"
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
import { UPDATE_CONTENT_EVENT } from '@/constants'
import type { ContentData } from '@/types/content'

export default {
  components: { ContentCard, ContentCardSkeleton },
  data() {
    return {
      checkedForDeletionContentIds: [] as string[],
    }
  },
  computed: {
    ...mapState(useContentStore, ['contents', 'isContentStoreProcessing']),
  },
  methods: {
    ...mapActions(useContentStore, ['openContentDetail']),
    async handleDeleteContent(contentId: string) {
      await deleteContent(contentId)
    },
    handleUpdateContent(contentData: ContentData) {
      this.$emit(UPDATE_CONTENT_EVENT, contentData)
    },
    handleCheckForDeletion(contentId: string) {
      this.checkedForDeletionContentIds.push(contentId)
    },
    handleCancelCheckForDeletion(contentId: string) {
      const targetIdx = this.checkedForDeletionContentIds.indexOf(contentId)
      this.checkedForDeletionContentIds.slice(targetIdx, 1)
    },
    async handleDeleteSelection() {
      for (const contentId of this.checkedForDeletionContentIds) {
        await deleteContent(contentId, true)
      }
      window.location.reload()
    },
  },
}
</script>
