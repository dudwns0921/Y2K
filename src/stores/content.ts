import { defineStore } from 'pinia'
import { getContents } from '@/api/firebase/database'
import type { ContentDataResponse } from '@/types/content'

interface ContentState {
  contents: ContentDataResponse[]
  isContentLoading: boolean
  isContentDetailOpen: boolean
  currentDetailContent: ContentDataResponse | null
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
    openContentDetail(content: ContentDataResponse) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        this.isContentDetailOpen = true
        this.currentDetailContent = content
      }, 100)
    },
  },
})
