<template lang="pug">
view.vmall-search-result
  view.card(
    v-for="(item,index) in searchList", 
    :key="index",
		@click="onGoodsClick")
    image(:src="item.url")
    view.content
      view.title {{ item.title }}
      view.money
        text.unit ￥
        text.price {{ decimal(item.price,0) }}
        text.decimal .{{ decimal(item.price,1) }}
</template>

<script setup>
import { GOODS_DATA } from "@/model";

const searchList = ref(GOODS_DATA);

// 触底触发
onReachBottom(() => {
  uni.showToast({
    title: "触底加载……",
    icon: "none",
    duration: 1000
  });
});

// 组件点击事件
const onGoodsClick = () => {
  uni.navigateTo({
    url: "/pages/packageA/goodsDetail/goodsDetail?id=1"
  });
};

const decimal = (value, type) => {
  return value.split(".")[type];
};
</script>

<style lang="scss" scoped>
.vmall-search-result {
  .card {
    display: flex;
    padding: 24rpx;
    border-bottom: 2rpx solid #f6f6f6;

    image {
      width: 200rpx;
      height: 200rpx;
    }

    .content {
      flex: 1;
      margin-left: 24rpx;
    }

    .title {
      font-size: 32rpx;
    }

    .money {
      margin-top: 8rpx;
      color: #fa3534;
    }

    .price {
      font-size: 32rpx;
      font-weight: bold;
    }

    .unit,
    .decimal {
      font-size: 24rpx;
    }
  }
}
</style>
