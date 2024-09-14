<template lang="pug">
view.detail-card.px-32.py-32.bg-white
  view.mb-24
    image.img(:src="Shop")
    text.f-28-B {{ item.shop_name }}
  u-line(color="#E6E6E6")
  view.flex.items-center.my-20.f-28
    text.mr-20 订单编号：{{ item.order_no }}
    text.copy-btn.tc(@click="onCopyNumber(item.order_no)") 复制
  view.flex.relative
    image.cover.mr-28(:src="item.goods.goods_spec_image")
    view.type.absolute.mr-16.f-28 海淘
    view.flex.column.flex1
      view.f-32-B {{ item.goods.goods_name }}
      view.specif.mt-56.f-28 {{ item.goods.goods_spec_name }}
      view.flex.justify-between.mt-8
        text.price.f-32-B ￥{{ item.goods.price }}
        text.f-28 ×{{ item.goods.quantity }}
</template>

<script setup>
import { IMG_URL } from "@/config";
import copyContent from "@/utils/copy";
// 服务器图片
import Shop from "@/static/images/shop.png";

const props = defineProps({
  item: {}
});

// 复制订单号
const onCopyNumber = (number) => {
  copyContent(number);
};
</script>

<style lang="scss" scoped>
.detail-card {
  .img {
    margin-right: 12rpx;
    width: 40rpx;
    height: 40rpx;
    vertical-align: text-bottom;
  }
  .cover {
    width: 200rpx;
    height: 200rpx;
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
  .copy-btn {
    width: 88rpx;
    height: 48rpx;
    line-height: 48rpx;
    background: rgba(0, 82, 217, 0.12);
    color: #0052d9;
    border-radius: 8rpx;
    border: 2rpx solid #0052d9;
  }
}
</style>
