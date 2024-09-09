<!--
 * @Author: WJ23000 624473119@qq.com
 * @Date: 2023-08-17 20:03:58
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-14 16:59:12
 * @FilePath: \medical-examination\src\components\experience-card-popup.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.customer-service
  movable-area.movable-area
    movable-view.movable-view(:x="x" :y="y" direction="all")
      //- 联系客服
      button.contact-btn.relative(@click="onPkResult")
        image.contact-img.absolute(:src="PkLogo")
        up-badge.badge.absolute(v-if="count > 0" type="error" max="99" :value="count")
</template>

<script setup>
import { IMG_URL } from "@/config";
import { getUserInfo } from "@/service";
// 服务器图片
import PkLogo from "@/static/images/pk-logo.png";

const emit = defineEmits(["watchAd"]);
const props = defineProps({
  type: {
    type: String,
    default: "1"
  },
  top: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 3
  }
});

const x = ref(298); // x坐标
const y = ref(uni.getSystemInfoSync().screenHeight); // y坐标
const userInfo = ref();

onMounted(() => {
  y.value = uni.getSystemInfoSync().screenHeight - 220;
});

// pk一下
const onPkResult = () => {
  userInfo.value = getUserInfo();
  if (userInfo.value.pk_num == 0) {
    emit("watchAd");
    return;
  }
  if (props.count > 0 && props.count <= 3) {
    uni.navigateTo({ url: "/pagesA/pk/index?form=1" });
  } else {
    uni.showToast({
      title: "至少选择一个球杆",
      icon: "none",
      mask: true
    });
  }
};
</script>

<style lang="stylus" scoped>
.customer-service
  .movable-area
    width: 750rpx;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 250;
    pointer-events: none;
    .movable-view
      width: 100rpx;
      height: 100rpx;
      pointer-events: auto;
      .contact-btn
        width: 96rpx;
        height: 96rpx;
        // background: #0052D9;
        border-radius: 100rpx;
      .contact-btn:after
        border: none;
      .contact-img
        top: 0rpx;
        left: 0rpx;
        width: 96rpx;
        height: 96rpx;
      .badge
        top: -10rpx;
        right: -10rpx;
</style>
