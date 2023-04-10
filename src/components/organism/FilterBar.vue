<template>
  <div class="flex gap-2">
    <FilterComponent content="전체보기"></FilterComponent>
    <FilterComponent content="드라마"></FilterComponent>
    <FilterComponent content="홍보영상"></FilterComponent>
    <FilterComponent content="긴 문장의 다큐멘터리"></FilterComponent>
  </div>
</template>
<script lang="ts">
import FilterComponent from '../molecule/FilterComponent.vue'

export default {
  components: { FilterComponent },
}
</script>
