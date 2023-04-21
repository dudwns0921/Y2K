<template>
  <div class="flex gap-[14px]">
    <p class="text-[#CACACA]">{{ filteredContentsCountText }}</p>
    <select v-model="criteria" name="criteria">
      <option value="date">날짜순</option>
      <option value="title">제목순</option>
    </select>
    <select v-model="order" name="sort2">
      <option value="desc">내림차순</option>
      <option value="asc">오름차순</option>
    </select>
  </div>
</template>
<script lang="ts">
import { useContentStore } from '@/stores/content'
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      criteria: 'date',
      order: 'desc',
    }
  },
  computed: {
    filteredContentsCountText() {
      return `조회결과 ${useContentStore().filteredContentsCount}건`
    },
    criteriaAndOrder() {
      const { criteria, order } = this
      return {
        criteria,
        order,
      }
    },
  },
  watch: {
    criteriaAndOrder: {
      handler: function () {
        this.sort()
      },
      deep: true,
    },
  },
  mounted() {
    this.sort()
  },
  methods: {
    ...mapActions(useContentStore, ['sortByTitle', 'sortByDate']),
    sort() {
      if (this.criteria === 'title') {
        this.sortByTitle(this.order)
      } else {
        this.sortByDate(this.order)
      }
    },
  },
}
</script>
<style lang="scss"></style>
