<template>
  <div class="flex flex-col">
    <label v-if="label" class="font-bold">{{ label }}</label>
    <div ref="filterWindowContainer">
      <div
        class="border border-black flex items-center p-[9px] h-[49px] mt-[12px]"
        :class="inputClass"
      >
        <div class="flex gap-[8px]">
          <InputFilter
            v-for="innerFilter in innerFilters"
            :key="innerFilter"
            :content="innerFilter"
            @delete-filter="handleDeleteFilter(innerFilter)"
          ></InputFilter>
        </div>
        <input
          ref="filterInput"
          type="text"
          :value="filterText"
          class="focus:outline-none w-full ml-[9px]"
          autocomplete="off"
          @input="handleInput"
          @keyup.enter="addFilter(filterText)"
          @focus="openFilterWindow"
          @blur.prevent
        />
      </div>
      <div
        v-if="isFilterWindowOpen"
        class="w-full border border-black border-t-0 p-[9px] flex flex-col gap-[9px]"
      >
        <WindowFilter
          v-for="filter in filters"
          :key="filter"
          :content="filter"
          @add-filter="addFilter(filter)"
        ></WindowFilter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import InputFilter from '../molecule/filter/InputFilter.vue'
import WindowFilter from '../molecule/filter/WindowFilter.vue'
import { useContentStore } from '@/stores/content'

export default {
  components: { InputFilter, WindowFilter },
  props: {
    label: { type: String, required: false, default: '' },
    width: {
      type: String,
      default: 'full',
    },
    height: {
      type: String,
      default: 'full',
    },
  },
  data() {
    return {
      filterText: '',
      isFilterWindowOpen: false,
      innerFilters: [] as string[],
    }
  },
  computed: {
    ...mapState(useContentStore, ['filters']),
    inputClass() {
      let width = ''
      let height = ''
      if (this.width === 'full') {
        width = this.width
      } else {
        width = `[${this.width}]`
      }
      if (this.height === 'full') {
        height = this.height
      } else {
        height = `[${this.height}]`
      }
      return `w-${width} h-${height}`
    },
  },
  mounted() {
    document.addEventListener('click', this.handleFilterWindowOutsideClick)
  },
  unmounted() {
    document.removeEventListener('click', this.handleFilterWindowOutsideClick)
  },
  methods: {
    handleFilterWindowOutsideClick(event: MouseEvent) {
      const filterWindowContainer = this.$refs
        .filterWindowContainer as HTMLDivElement
      if (
        filterWindowContainer &&
        filterWindowContainer.contains(event.target as Node)
      ) {
        // 필터창 안쪽 클릭
        this.focusFilterInput()
      } else {
        // 그외 클릭
        this.closeFilterWindow()
      }
    },
    handleInput(event: Event) {
      const eventTarget = event.target as HTMLInputElement
      this.filterText = eventTarget.value
    },
    addFilter(filter: string) {
      const isFilterDuplicated = this.innerFilters.indexOf(filter) >= 0
      const isFilterEmpty = filter.length === 0

      if (!isFilterDuplicated && !isFilterEmpty) {
        this.$emit('add-filter', filter)
        this.innerFilters.push(filter)
      }

      this.filterText = ''

      this.focusFilterInput()
    },
    openFilterWindow() {
      this.isFilterWindowOpen = true
    },
    closeFilterWindow() {
      this.isFilterWindowOpen = false
    },
    handleDeleteFilter(filter: string) {
      const indexToDelete = this.innerFilters.indexOf(filter)
      this.innerFilters.splice(indexToDelete, 1)
      this.$emit('delete-filter', filter)

      this.focusFilterInput()
    },
    focusFilterInput() {
      const filterInputRef = this.$refs.filterInput as HTMLInputElement
      filterInputRef.focus()
    },
  },
}
</script>
