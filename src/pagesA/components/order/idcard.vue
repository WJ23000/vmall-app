<template lang="pug">
view.idcard-explain
  up-modal.custom-modal(:show="show" :showConfirmButton="false" width="692rpx")
    view.slot-content.px-40
      view.flex.justify-center.f-36-B 为什么要上传身份信息
      view.mt-32.f-28 请你务必正确填写身份信息，以确保你购物的商品顺利通过海关检查。
      view.f-28 （“O·FREEME”承诺所传身份证明只用于办理跨境商品的清关手续，不作其他用途使用，其他任何人均无法查看）
      view.confirm-btn.mt-32.tc.f-28-B(@click="onConfirm") 确认
</template>

<script setup>
const emit = defineEmits(["confirm"]);
const show = ref(true);

const onConfirm = () => {
  emit("confirm");
}
</script>

<style lang="stylus" scoped>
.idcard-explain
  .confirm-btn
    width: 612rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #0052D9;
    color: #ffffff;
    border-radius: 104rpx;
</style>
