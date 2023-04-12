import { defineStore } from 'pinia'
import type { ContentData } from '@/types/content'
import { getContents } from '@/api/firebase/database'

interface ContentState {
  contents: ContentData[]
  isContentLoading: boolean
  isContentDetailOpen: boolean
  currentDetailContent: ContentData | null
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({
    contents: [],
    isContentLoading: false,
    isContentDetailOpen: false,
    currentDetailContent: null,
  }),
  actions: {
    async setContents() {
      this.isContentLoading = true
      const allContent = await getContents()
      if (allContent !== undefined) {
        this.contents = allContent
        this.isContentLoading = false
      }
    },
    openContentDetail(content: ContentData) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        this.isContentDetailOpen = true
        this.currentDetailContent = content
      }, 100)
    },
  },
})
