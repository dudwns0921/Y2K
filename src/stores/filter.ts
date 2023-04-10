import { defineStore } from 'pinia'

interface FilterState {
  filterList: string[]
}

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => ({
    filterList: [],
  }),
  actions: {
    addFilter(item: string) {
      this.filterList.push(item)
    },
  },
})
