import { initEasycoms } from '@dcloudio/uni-cli-shared';
<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-02-29 11:41:34
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.banner
  swiper.swiper.w100(
    circular 
    indicator-dots="true"
    indicator-active-color="#ffffff"
    autoplay="true" 
    interval="3000")
    swiper-item(
      v-for="(item, index) in bannerList"
      :key="index")
      button.contact-btn.flex.justify-between.items-center.w100(
        v-if="item.link"
        open-type="openAwemeUserProfile"
        @openawemeuserprofile="onDoyinClick"
        :data-aweme-id="item.link")
        image.w-686.h-384(:src="item.image")
      image.w-686.h-384(v-else :src="item.image" @click="onSwiper(item)")
</template>

<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 192
  },
  bannerList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

// banner跳转
const onSwiper = (index) => {
  console.log("当前banner", item);
};

// 官方抖音
const onDoyinClick = (e) => {
  if (e.detail.errNo) {
    console.log("跳转抖音号个人页失败", e.detail);
  } else {
    console.log("跳转抖音号个人页成功");
  }
};
</script>

<style lang="stylus" scoped>
.banner
  .swiper
    height: 384rpx;
    border-radius: 18rpx;
  .contact-btn
    background: none;
    border-radius: 0;
    padding: 0;
    margin: 0 !important;
    line-height: 1;
    font-weight: normal;
    outline: none;
  .contact-btn:after
    border: none;
</style>
