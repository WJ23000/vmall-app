<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-18 15:22:45
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.contract-explain
  up-modal(:show="show" :showConfirmButton="false" width="692rpx")
    view.slot-content.px-40
      view.flex.justify-center.f-36-B 《进口个人委托申报委托函》
      view.container.mt-32.px-12.py-12
        view.f-28 本人承诺所购买商品系个人合理自用，针对保税区发货的各类商品.现委托商家代理申报、代缴税款等通关事宜，本人保证将遵守《海关法》等国家相关法律法规的规定，保证所提供的身份信息和收货信息真实完整，无侵犯他人权益之行为。以上委托系本人真实意愿表示，本人愿意接受海关、检验检疫机构及其他监管部门的监管，并承担相应的法律责任。
      view.confirm-btn.mt-32.tc.f-28-B(@click="onConfirm") 我知道了
</template>

<script setup>
const emit = defineEmits(["confirm"]);
const show = ref(true);

const onConfirm = () => {
  emit("confirm");
}
</script>

<style lang="stylus" scoped>
.contract-explain
  .container
    background: #F5F5F5;
  .confirm-btn
    width: 612rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #0052D9;
    color: #ffffff;
    border-radius: 104rpx;
</style>
