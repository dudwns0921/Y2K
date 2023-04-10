<template>
  <div class="triangle"></div>
</template>
<script lang="ts">
export default {}
</script>
<style lang="scss">
/* FIXME : tailwind로 고쳐보기 */
.triangle {
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 20px solid #000;
}
</style>
