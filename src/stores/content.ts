import { defineStore } from 'pinia'
import { getContentsAndFilters } from '@/api/firebase/database'
import type { ContentData } from '@/types/content'

interface ContentState {
  contents: ContentData[]
  filters: string[]
  selectedFilters: string[]
  isContentStoreProcessing: boolean
  isContentDetailOpen: boolean
  currentDetailContent: ContentData | null
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({
    contents: [],
    filters: [],
    selectedFilters: [],
    isContentStoreProcessing: false,
    isContentDetailOpen: false,
    currentDetailContent: null,
  }),
  actions: {
    async setContentsAndFilters() {
      this.isContentStoreProcessing = true
      const contentsAndFilters = await getContentsAndFilters()
      if (contentsAndFilters !== undefined) {
        this.contents = contentsAndFilters.contents
        this.filters = Array.from(new Set(contentsAndFilters.filters))
        // 중복 제거 후 할당
        this.isContentStoreProcessing = false
      }
    },
    openContentDetail(content: ContentData) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        this.isContentDetailOpen = true
        this.currentDetailContent = content
      }, 100)
    },
    addSelectedFilter(selectedFilter: string) {
      this.selectedFilters.push(selectedFilter)
    },
    removeFilter(filter: string) {
      const targetIdx = this.selectedFilters.indexOf(filter)
      this.selectedFilters.splice(targetIdx, 1)
    },
  },
})
