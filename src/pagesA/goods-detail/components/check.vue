<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-28 10:02:33
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.shop-check
  u-popup(:show="show" :closeable="true" @close="onClose")
    view.px-20
      view.flex.justify-start.mt-108
        image.shop-img.mr-28(:src="specifList[current].image")
        view.flex.column
          view.price.f-40-B ￥{{specifList[current].price}}
          view.mt-16.f-28 剩余：{{specifList[current].stock}} 件
      view.mt-32.f-32 规格
      view.flex.flex-wrap
        view.specif-item.mt-16.mr-16.tc.f-28(
          :class="{ 'active': item.checked, 'disabled': item.count == 0 }"
          v-for="(item, index) in specifList"
          :key="index"
          @click="onCheckSpecif(item, index)") {{ item.name }}
      view.flex.justify-between.items-center.mt-64
        view.f-32 数量
        view
          view.flex.mb-12
            text(class="input cart-reduce") -
            text(class="input cart-text") 1
            text(class="input cart-add") +
          view.f-24 每次限购1件
      view.confirm-btn.my-32.tc.f-28-B(
        :class="{ 'pay-active': props.specType == 2, 'pay-disabled': specifList[current].stock == 0 }"
        @click="props.specType == 1 ? onCart() : onPay()") {{ props.specType == 1 ? "加入购物车" : "立即购买" }}
</template>

<script setup>
import { IMG_URL } from "@/config";
// 服务器图片
const DetailImg2 = ref(IMG_URL + "/images/detail-img2.png");

const props = defineProps({
  specifList: [],
  specType: {
    type: Number,
    default: 1
  }
});
const current = ref(0);
const emit = defineEmits(["close", "cart", "pay"]);
const show = ref(true);

const onCheckSpecif = (item, index) => {
  if (item.stock == 0) return;
  current.value = index;
  props.specifList.forEach((item) => {
    item.checked = false;
  });
  item.checked = true;
};

const onClose = () => {
  emit("close");
};

// 加入购物车
const onCart = () => {
  emit("cart", props.specifList[current.value].id);
};

// 立即购买
const onPay = () => {
  if (props.specifList[current.value].stock == 0) {
    uni.showToast({
      title: "该商品库存不足，无法购买",
      icon: "none",
      mask: true
    });
    return;
  }
  emit("pay", props.specifList[current.value]);
};
</script>

<style lang="stylus" scoped>
.shop-check
  .shop-img
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
  .price
    color: #F53F3F;
  .specif-item
    width: 218rpx;
    height: 64rpx;
    line-height: 64rpx;
    background: #F5F5F5;
    border-radius: 32rpx;
  .specif-item:nth-child(3n)
    margin-right: 0;
  .active
    background: #0052D9;
    color: #ffffff;
  .disabled
    background: #F5F5F5;
    color: #909193;
  .input
    display: block;
    width: 44rpx;
    height: 44rpx;
    line-height: 44rpx;
    text-align: center;
    float: left;
  .cart-add
    border-left: none;
    border: 2rpx solid #ededed;
    border-radius: 0rpx 8rpx 8rpx 0rpx;
    font-size: 36rpx;
    color: #CCCCCC
  .cart-reduce
    border-right: none;
    border: 2rpx solid #ededed;
    border-radius: 8rpx 0rpx 0rpx 8rpx;
    font-size: 36rpx;
    color: #CCCCCC
  .cart-text
    width: 44rpx;
    border-top: 2rpx solid #ededed;
    border-bottom: 2rpx solid #ededed;
    font-size: 28rpx;
  .cart-tip
    color: #606266;
  .confirm-btn
    width: 100%;
    height: 72rpx;
    line-height: 72rpx;
    background: #0052D9;
    color: #ffffff;
    border-radius: 104rpx;
  .pay-active
    background: #fa3534;
    color: #ffffff;
  .pay-disabled
    background: #909193;
    color: #ffffff;
  :deep(.u-icon__icon)
    color: #000000 !important;
    font-size: 30rpx !important;
</style>
