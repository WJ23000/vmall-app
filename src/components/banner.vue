<template lang="pug">
view.banner
  up-swiper(
    :list="bannerList"
    keyName="image"
    indicator
    indicatorMode="line"
    circular
    imgMode="scaleToFill"
    @change="onSwiperChange"
    @click="onSwiperClick")
</template>

<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 162
  },
  bannerList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

// 轮播图切换时触发
const onSwiperChange = (e) => {
  // console.log("当前索引", e);
};
// 点击轮播图时触发
const onSwiperClick = (e) => {
  // console.log("当前索引", e);
};
</script>

<style lang="scss" scoped></style>
