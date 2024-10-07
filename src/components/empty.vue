<template lang="pug">
view.empty.flex.column.justify-center.items-center
  image(:src="emptyInfo.image" :style="{ width: emptyInfo.width + 'rpx', height: emptyInfo.height + 'rpx'}")
  view.tip.mt-20.f-28 {{ emptyInfo.tip }}
</template>

<script setup>
const props = defineProps({
  emptyInfo: {
    type: Function,
    default: () => {
      return {
        image: "",
        tip: "",
        width: 400,
        height: 400
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.empty {
  background: #ffffff;
  width: 100vw;
  .tip {
    color: #909193;
  }
}
</style>
