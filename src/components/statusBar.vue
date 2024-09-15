<template lang="pug">
<!-- #ifdef APP-PLUS -->  
view.status-bar(:style="{background: bgColor}")
<!-- #endif --> 
</template>

<script setup>
const props = defineProps({
  bgColor: {
    type: String,
    default: "#ffffff"
  }
});
</script>

<style lang="scss" scoped>
.status-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--status-bar-height); // 状态栏高度
  z-index: 1000;
}
</style>
