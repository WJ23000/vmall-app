<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-17 17:09:11
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.notify-explain
  up-modal(:show="show" :showConfirmButton="false" width="692rpx")
    view.slot-content.px-40
      view.flex.justify-center.f-36-B 《消费者告知书》
      view.container.mt-32.px-12.py-12
        view.f-28
          text 你好！为帮助你更好地选购境外商品，请你在购物前务必认真、详细地阅读并理解本《消费者告知书》的全部内容，并对自身风险承担做出客观判断。
          text.bold 请你在同意本告知书内容后再下单购买：
        view.mt-20.f-28 1、你知晓你所购买的商品符合原产地有关质量、安全、卫生、环保、标识等标准或技术规范要求，但可与我国标准存在差异，你需自行承担相关风险。
        view.mt-20.f-28 2、你知晓您所购买的商品直接购自境外可能无中文标签，您可以通过产品上贴二维码扫码、商品详情页查看相关商品标签中文翻译或者联系店铺客服询问。
        view.mt-20.f-28 3、你知晓根据相关法律法规的规定，你所购买的商品仅限于个人自用，不得进行二次销售。
        view.mt-20.f-28 4、你知晓跨境电商零售进口商品按个人自用进境物品监管，不执行有关商品首次进口许可批件、注册或备案要求。
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
.notify-explain
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
