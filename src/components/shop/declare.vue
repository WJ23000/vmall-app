<template lang="pug">
view.shop-declare
  up-popup(:show="show" :closeable="true" @close="onClose")
    view.px-32
      view.flex.justify-center.mt-20.mb-32.f-32 服务申明
      view.mb-40.f-32-B 商品含税
      view.tip-text.mb-40.f-32 您购买的商品已包含跨境电商进口税，您无需再进行支付。
      view.mb-40.f-32-B 不支持7天无理由退货
      view.tip-text.mb-40.f-32 本商品不支持7天无理由退货。
      view.mb-40.f-32-B 快递发货
      view.tip-text.f-32 可选择快递发货配送上门，本商品免运费。
      view.confirm-btn.mt-40.mb-32.tc.f-28-B(@click="onConfirm") 我知道了
</template>

<script setup>
const emit = defineEmits(["close", "confirm"]);
const show = ref(true);

const onClose = () => {
  emit("close");
};

const onConfirm = () => {
  emit("confirm");
};
</script>

<style lang="stylus" scoped>
.shop-declare
  .tip-text
    color: #606266;
  .confirm-btn
    width: 100%;
    height: 72rpx;
    line-height: 72rpx;
    background: #0052D9;
    color: #ffffff;
    border-radius: 104rpx;
</style>
