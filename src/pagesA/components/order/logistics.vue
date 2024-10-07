<template lang="pug">
view.order-logistics.px-32.py-32.bg-white
  view.flex
    image.cover.mr-28(:src="item.goods_spec_image")
    view.flex.column.flex1
      view.flex.mt-8.f-28
        view.title 订单编号：
        view {{ item.order_no }}
      view.flex.mt-40.f-28
        view.title 物流公司：
        view {{ item.express_company }}
      view.flex.mt-40.f-28
        view.title 物流单号：
        view {{ item.express_no }}
</template>

<script setup>
const props = defineProps({
  item: {}
});
</script>

<style lang="scss" scoped>
.order-logistics {
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
  .title {
    color: #909193;
  }
}
</style>
