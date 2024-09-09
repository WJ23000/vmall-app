<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-04 17:18:12
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.model-confirm
  u-modal(:show="show" :showConfirmButton="false" width="622rpx")
    view.slot-content.px-48
      view.flex.justify-center.f-32 {{ title }}
      view.flex.justify-center.mt-32
        button.cancel-btn.mr-24.tc.f-28(@click="onCancel") 取消
        button.confirm-btn.tc.f-28(@click="onConfirm") {{ confirmTitle }}
</template>

<script setup>
import { IMG_URL } from "@/config";
// 服务器图片
const Close = ref(IMG_URL + "/close.png");

const emit = defineEmits(["cancel","confirm"]);
const props = defineProps({
  title: {
    type: String,
    default: "确认提交？"
  },
  confirmTitle: {
    type: String,
    default: "确认"
  },
});

const show = ref(true);

const onCancel = () => {
  emit("cancel");
}
const onConfirm = () => {
  emit("confirm");
}
</script>

<style lang="stylus" scoped>
.model-confirm
  .close
    position: absolute;
    top: 32rpx;
    right: 32rpx;
  .cancel-btn
    padding: 0;
    width: 250rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #ECECEC;
    color: #000000;
    border-radius: 98rpx;
  .cancel-btn:after
    border: none;
  .confirm-btn
    padding: 0;
    width: 250rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #0052D9;
    color: #ffffff;
    border-radius: 98rpx;
  .confirm-btn:after
    border: none;
</style>
