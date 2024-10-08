<template lang="pug">
view.write-idcard
  up-popup.custom-popup(:show="show" :closeable="true" @close="onClose")
    view.px-32
      view.flex.justify-center.mt-20.mb-40
        text.mr-16.f-32 填写身份信息
        image.icon-explain(:src="IdCardExplain", @click="onTip")
      view.tip-readonly-text.px-16.py-16.f-28(v-if="isReadonly") 你已完成身份绑定，每个用户仅能绑定一个身份证号购买跨境商品，且绑定后不可换绑，如有疑问请联系商家。
      view.tip-text.px-16.py-16.f-28(v-else) 根据海关最新要求，每个用户仅能绑定一个身份证号购买跨境商品，且绑定后不可换绑，请谨慎填写。
      view.cell.f-32
        view.mr-20 真实姓名
        input.input-color(
          placeholder="请填写真实姓名"
          border="surround"
          :cursor-spacing="spacing.realname"
          :adjust-position="true"
          :always-embed="true"
          maxlength="15"
          color="#909193"
          :disabled="isReadonly"
          v-model="form.realname")
      view.cell.f-32
        view.mr-20 身份证号
        input.input-color(
          placeholder="请填写真实身份证号"
          border="surround"
          :cursor-spacing="spacing.identity"
          :adjust-position="true"
          :always-embed="true"
          maxlength="18"
          color="#909193"
          :disabled="isReadonly"
          v-model="form.identity")
      view.confirm-btn.mt-80.mb-32.tc.f-28-B(@click="onConfirm") 保存
</template>

<script setup>
import { onMounted } from "vue";
import { IMG_URL } from "@/config";
// 服务器图片
const IdCardExplain = ref(IMG_URL + "/images/idcard-explain.png");

const props = defineProps({
  idCardInfo: {
    type: Function,
    default: () => {
      return {
        realname: "",
        identity: ""
      };
    }
  },
  isReadonly: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["close", "tip", "confirm"]);
const show = ref(true);
const form = ref({
  realname: "",
  identity: ""
});
const spacing = {
  realname: uni.getSystemInfoSync().platform == "ios" ? 182 : 142,
  identity: uni.getSystemInfoSync().platform == "ios" ? 140 : 100
};

onMounted(() => {
  if (props.isReadonly) {
    form.value = props.idCardInfo;
  }
});

const onClose = () => {
  emit("close");
};

const onTip = () => {
  emit("tip");
};

const onConfirm = () => {
  // 已认证按钮不可点击
  if (props.isReadonly) {
    return;
  }
  if (form.value.realname.trim() == "" || form.value.identity.trim() == "") {
    uni.showToast({
      title: "真实姓名和身份证号不能为空",
      icon: "none",
      mask: true
    });
    return;
  }
  emit("confirm", form.value);
};
</script>

<style lang="stylus" scoped>
.write-idcard
  .icon-explain
    width: 44rpx;
    height: 44rpx;
  .cell
    display: flex;
    align-items: center;
    padding: 20rpx 0rpx;
    border-bottom: 2rpx solid #E6E6E6;
  .tip-text
    background: #F5F5F5;
    color: #E84026;
    line-height: 44rpx;
  .tip-readonly-text
    background: #F5F5F5;
    color: #606266;
    line-height: 44rpx;
  .confirm-btn
    width: 100%;
    height: 72rpx;
    line-height: 72rpx;
    background: #0052D9;
    color: #ffffff;
    border-radius: 104rpx;
  .input-color
    color: #909193;
</style>
