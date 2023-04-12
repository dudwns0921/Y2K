import { getFilters } from '@/api/firebase/database'
import { defineStore } from 'pinia'

interface FilterState {
  filters: string[]
  isFilterLoading: boolean
}

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => ({
    filters: [],
    isFilterLoading: false,
  }),
  actions: {
    addFilter(item: string) {
      this.filters.push(item)
    },
    async setFilters() {
      this.isFilterLoading = true
      const allFilter = await getFilters()
      if (allFilter !== undefined) {
        this.filters = allFilter
        this.isFilterLoading = false
      }
    },
  },
})
