<template lang="pug">
view.vmall-order-success.flex.column.justify-center.items-center
  image.success-img.mt-60.mb-24(:src="PaySuccess")
  view.mb-92.f-40-B 支付成功
  view.btn-fixed.flex.column.justify-center.items-center
    view.confirm-btn.f-32-B.white(@click="onQueryOrder")
      text 查看订单
    view.back-btn.mt-44.f-32-B.white(@click="onBackHome")
      text 返回首页
</template>

<script setup>
import { IMG_URL } from "@/config";

const PaySuccess = ref("http://cdn.wjaxx.xyz/pay-success.png");

// 查看订单
const onQueryOrder = () => {
  uni.navigateTo({ url: "/pagesA/order/index?current=0&type=0" });
};

// 返回首页
const onBackHome = () => {
  uni.switchTab({ url: "/pages/tabbar/home/index" });
};
</script>

<style lang="scss" scoped>
.vmall-order-success {
  .success-img {
    width: 160rpx;
    height: 160rpx;
  }
  .btn-fixed {
    width: 100%;
    margin: 0 auto;
  }
  .confirm-btn {
    width: 510rpx;
    height: 96rpx;
    line-height: 96rpx;
    background: #0052d9;
    color: #ffffff;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
  }
  .back-btn {
    width: 510rpx;
    height: 96rpx;
    line-height: 96rpx;
    background: #f2f3ff;
    color: #0052d9;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
    border: 2rpx solid #0052d9;
  }
}
</style>
