<script lang="ts">
import TheWelcome from '@/components/molecule/TheWelcome.vue'
import FilterBar from '@/components/organism/FilterBar.vue'
export default {
  components: {
    TheWelcome,
    FilterBar,
  },
}
</script>

<template>
  <main><FilterBar></FilterBar><TheWelcome></TheWelcome></main>
</template>
