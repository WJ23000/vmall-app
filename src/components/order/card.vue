<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-23 17:21:58
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.order-card.mx-20.mt-24
  view.item.px-20.pt-16.pb-32.bg-white
    view.flex.justify-between.my-20.f-24 
      view.f-28-B 订单编号：{{ item.order_no }}
      view.status-text.f-24 {{ statusText(item.status) }}
    view.shop.flex.relative
      image.cover.mr-28(:src="item.url")
      view.flex.column.flex1
        view.f-28 {{ item.title }}
        //- view.specif.mt-36.f-28 {{ item.goods_spec_name }}
        view.flex.justify-between.mt-24
          view.price.f-32-B 
            text.f-24 ￥
            text.f-32 {{ item.price }}
          text.f-28 共{{ item.quantity }}件
    view.submit.flex.justify-end.items-center.mt-24
      view.btn.tc.f-24(v-if="item.status == 10 || item.status == 20 || item.status == 30") 取消订单
      view.btn.tc.f-24(v-if="item.status == 50") 评价晒单
      view.btn.ml-20.tc.f-24(v-if="item.status == 50") 退换/售后
      //- view.btn.tc.f-24(v-if="item.status == 51" @click="onDeleteOrder(item)") 删除订单
      view.buy-btn.ml-20.tc.f-24(@click="onOrderDetail(item)") 再次购买
</template>

<script setup>
const props = defineProps({
  item: {}
});
const emit = defineEmits(["delete", "detail"]);

// 删除订单
const onDeleteOrder = (item) => {
  emit("delete", item.id);
};

// 订单详情
const onOrderDetail = (item) => {
  emit("detail", item.id);
};

// 订单状态
const statusText = (status) => {
  let text = "";
  switch (status) {
    case 10:
      text = "待付款";
      break;
    case 20:
      text = "待发货";
      break;
    case 30:
      text = "待收货";
      break;
    case 40:
      text = "待评价";
      break;
    case 50:
      text = "已完成";
      break;
    case 51:
      text = "已取消";
      break;
    default:
      break;
  }
  return text;
};
</script>

<style lang="scss" scoped>
.order-card {
  .status-text {
    color: #666666;
  }
  .status-active {
    color: #fa3534;
  }
  .item {
    background: #ffffff;
    border-radius: 30rpx;
  }
  .img {
    margin-right: 12rpx;
    width: 40rpx;
    height: 40rpx;
    vertical-align: text-bottom;
  }
  .cover {
    width: 140rpx;
    height: 140rpx;
    border-radius: 16rpx;
  }
  .type {
    padding: 0rpx 20rpx;
    height: 56rpx;
    line-height: 56rpx;
    background: #6a1b99;
    color: #ffffff;
    border-radius: 16rpx 0rpx 16rpx 0rpx;
  }
  .price {
    color: #f53f3f;
  }
  .specif {
    color: #606266;
  }
  .submit {
    width: 100%;
    background: #ffffff;
    box-sizing: border-box;
  }
  .btn {
    width: 150rpx;
    height: 50rpx;
    line-height: 50rpx;
    background: #ffffff;
    color: #333333;
    border-radius: 52rpx;
    border: 2rpx solid #333333;
  }
  .buy-btn {
    width: 150rpx;
    height: 50rpx;
    line-height: 50rpx;
    background: #ffffff;
    color: #fa3534;
    border-radius: 52rpx;
    border: 2rpx solid #fa3534;
  }
}
</style>
