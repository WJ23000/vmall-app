<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-21 09:39:45
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.order-success.flex.column.justify-center.items-center
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
// 服务器图片
const PaySuccess = ref(IMG_URL + "/images/pay-success.png");

// 查看订单
const onQueryOrder = () => {
  uni.navigateTo({ url: "/pagesA/order/list" });
}

// 返回首页
const onBackHome = () => {
  uni.switchTab({ url: "/pages/tabbar/home" });
}
</script>

<style lang="stylus" scoped>
.order-success
  .success-img
    width: 160rpx;
    height: 160rpx;
  .btn-fixed
    width: 100%;
    margin: 0 auto;
  .confirm-btn
    width: 510rpx;
    height: 96rpx;
    line-height: 96rpx;
    background: #0052D9;
    color: #ffffff;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
  .back-btn
    width: 510rpx;
    height: 96rpx;
    line-height: 96rpx;
    background: #F2F3FF;
    color: #0052D9;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
    border: 2rpx solid #0052D9;
</style>
