<template lang="pug">
view.back-top
  up-back-top(
    :scroll-top="backTop", 
    :customStyle="customStyle"
    :iconStyle="iconStyle"
		right="12", 
    bottom="100"
		z-index="1000")
</template>

<script setup>
const props = defineProps({
  backTop: {
    type: Number,
    default: 0
  }
});
const customStyle = ref({
  backgroundColor: '#ffffff'  
});
const iconStyle = ref({
  fontSize: '36rpx',
  color: '#333333'  
});
</script>

<style lang="scss" scoped></style>
