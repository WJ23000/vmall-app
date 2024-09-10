<template lang="pug">
view.waterfall
  up-waterfall(v-model="shopList" ref="uWaterfallRef")
    template(v-slot:left="{leftList}")
      view.shop-warter(v-for="(item, index) in leftList" :key="index")
        up-lazy-load(threshold="-450" border-radius="10" :image="item.url" :index="index")
        view.shop-title {{ item.title }}
        view.shop-price
          text.unit ￥
          text.price {{ decimal(item.price,0) }}
          text.decimal .{{ decimal(item.price,1) }}
        view.shop-tag
          view.shop-tag-owner 自营
          view.shop-tag-text 放心购
    template(v-slot:right="{rightList}")
      view.shop-warter(v-for="(item, index) in rightList" :key="index")
        up-lazy-load(threshold="-450" border-radius="10" :image="item.url" :index="index")
        view.shop-title {{ item.title }}
        view.shop-price 
          text.unit ￥
          text.price {{ decimal(item.price,0) }}
          text.decimal .{{ decimal(item.price,1) }}
        view.shop-tag
          view.shop-tag-owner 自营
          view.shop-tag-text 放心购
  view.pb-10
    up-loadmore(:status="loadStatus" @loadmore="onAddRandomData")
</template>

<script setup>
const emit = defineEmits(["addRandomData"]);
const props = defineProps({
  loadStatus: {
    type: String,
    default: ""
  },
  flowList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

const uWaterfallRef = ref();
const shopList = ref([]);

watch(
  () => props.flowList,
  (newValue, oldValue) => {
    shopList.value = props.flowList;
  },
  {
    immediate: true,
    deep: true
  }
);

// 加载更多数据
const onAddRandomData = () => {
  emit("addRandomData");
};

const decimal = (value, type) => {
  return value.split(".")[type];
};

// 瀑布流数据清空
const onClear = () => {
  uWaterfallRef.value.clear();
};
defineExpose({ onClear });
</script>

<style lang="scss" scoped>
.waterfall {
  .shop-warter {
    border-radius: 16rpx;
    margin: 10rpx;
    background-color: #ffffff;
    padding: 16rpx;
    position: relative;
  }

  .u-close {
    position: absolute;
    top: 32rpx;
    right: 32rpx;
  }

  .shop-image {
    width: 100%;
    border-radius: 8rpx;
  }

  .shop-title {
    font-size: 30rpx;
    margin-top: 10rpx;
  }

  .shop-tag {
    display: flex;
    margin-top: 10rpx;
  }

  .shop-tag-owner {
    background-color: $uni-color-error;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 4rpx 14rpx;
    border-radius: 50rpx;
    font-size: 20rpx;
    line-height: 1;
  }

  .shop-tag-text {
    border: 1px solid $uni-color-primary;
    color: $uni-color-primary;
    margin-left: 10px;
    border-radius: 50rpx;
    line-height: 1;
    padding: 4rpx 14rpx;
    display: flex;
    align-items: center;
    border-radius: 50rpx;
    font-size: 20rpx;
  }

  .shop-price {
    font-size: 30rpx;
    color: $uni-color-error;
    margin-top: 10rpx;
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
