<template lang="pug">
view.order-card.mx-20.mt-24
  view.item.px-20.pt-16.pb-32.bg-white
    view(@click="onOrderDetail(item)")
      view.flex.justify-between.my-20.f-24 
        view.f-28-B 订单编号：{{ item.order_no }}
        view.f-24(:class="item.status != 50 ? 'status-active' : 'status-text'") {{ statusText(item.status) }}
      view.shop.flex
        image.cover.mr-28(:src="item.url")
        view.flex.column.flex1
          view.title.f-28 {{ item.title }}
          //- view.specif.mt-36.f-28 {{ item.goods_spec_name }}
          view.flex.justify-between.mt-24
            view.price.f-32-B 
              text.f-24 ￥
              text.f-32 {{ item.price }}
            text.f-28 共{{ item.quantity }}件
    view.submit.flex.justify-end.items-center.mt-24
      //- view.other.f-24(v-if="item.status == 51") 更多
      view.btn.tc.f-24(v-if="item.status == 10 || item.status == 20 || item.status == 30") 取消订单
      view.btn.ml-20.tc.f-24(
        v-if="item.status == 20 || item.status == 30 || item.status == 51" 
        @click="onOrderLogistics(item)") 查看物流
      view.btn.ml-20.tc.f-24(v-if="item.status == 51") 评价
      view.btn.ml-20.tc.f-24(v-if="item.status == 50" @click="onOrderDetail(item)") 查看详情
      view.buy-btn.ml-20.tc.f-24(v-if="item.status == 10" @click="onOrderDetail(item)") 立即支付
      view.buy-btn.ml-20.tc.f-24(v-if="item.status == 51") 再次购买
</template>

<script setup>
const props = defineProps({
  item: {}
});
const emit = defineEmits(["delete", "logistics", "detail"]);

// 删除订单
const onDeleteOrder = (item) => {
  emit("delete", item.id);
};

// 查看物流
const onOrderLogistics= (item) => {
  emit("logistics", item.id);
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
    case 50:
      text = "退货";
      break;
    case 51:
      text = "交易成功";
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
  .title {
    height: 74rpx;
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
    color: #fa3534;
  }
  .specif {
    color: #606266;
  }
  .submit {
    width: 100%;
    background: #ffffff;
    box-sizing: border-box;
    .other {
      color: #666666;
    }
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
