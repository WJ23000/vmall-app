<template lang="pug">
view.register
  image.bj.absolute(:src="ApplyBj")
  view.container.absolute.w100.flex.column.justify-center.px-32
    view.mb-32.pt-100.f-32-B 邀请码：
    up-input(
      fontSize="28rpx"
      placeholder="请输入邀请码"
      border="surround"
      v-model="form.invitation_code")
    view.my-32.f-32-B 手机号：
    up-input(
      fontSize="28rpx"
      placeholder="请输入手机号"
      type="number"
      border="surround"
      v-model="form.mobile")
    view.my-32.f-32-B 验证码：
    up-input(
      fontSize="28rpx"
      placeholder="请输入验证码"
      border="surround"
      v-model="form.captcha")
      template(#suffix)
        up-code(
          ref="uCodeRef"
          :seconds="seconds"
          startText="发送验证码"
          @change="codeChange")
        text.tip-text.f-32(@tap="getCode") {{ tips }}
  view.btn-fixed.flex.column.justify-center.items-center
    button.register-btn.f-32-B.white(@click="onRegister") 注册
    view.flex.justify-center.items-center.mt-28.f-28(@click="onCheckDefault")
      image.icon-width.mr-8(v-if="checked" :src="AgreementXz")
      image.icon-width.mr-8(v-else :src="AgreementWxz")
      text 我已阅读并同意
      text.tip-text(@click.stop="onAgreement(1)") 《用户协议》
      text.tip-text(@click.stop="onAgreement(2)") 《隐私政策》
  //- 注册提示
  up-overlay(:show="overlayShow" @click="overlayShow = false")
    view.overlay-container.flex.column.justify-center.items-center.px-72
      view.overlay-main.flex.column.px-40.py-48.bg-white.f-28
        text {{ tipInfo.title }}
        text.mt-16 注册时间: {{ tipInfo.time }}
        text.mt-16 邀请码: {{ tipInfo.invitation_code }}
      view.flex.column.justify-center.items-center.mt-28
        image.close-img(:src="OverlayClose")
</template>

<script setup>
import { IMG_URL } from "@/config";
import getQueryParam from "@/utils/getQueryParam";
import { setUserInfo } from "@/service";
import { loginApi, commonApi } from "@/api";
// 服务器图片
const ApplyBj = ref(IMG_URL + "/images/apply-bj.png");
const AgreementXz = ref(IMG_URL + "/images/agreement-xz.png");
const AgreementWxz = ref(IMG_URL + "/images/agreement-wxz.png");
const OverlayClose = ref(IMG_URL + "/images/overlay-close.png");
const form = ref({
  invitation_code: "",
  mobile: "",
  captcha: ""
});
const tipInfo = ref({
  title: "",
  time: "",
  invitation_code: ""
});
const tips = ref("");
const seconds = ref(60);
const uCodeRef = ref(null);
const checked = ref(false);
const overlayShow = ref(false);

onLoad((options) => {
  if (options.q) {
    const url = decodeURIComponent(options.q);
    form.value.invitation_code = getQueryParam(url, "invitation_code");
    tipInfo.value.invitation_code = getQueryParam(url, "invitation_code");
  }
});

const codeChange = (text) => {
  tips.value = text;
};

const getCode = () => {
  if (form.value.mobile.trim() == "") {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
      mask: true
    });
    return;
  }
  if (uCodeRef.value.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: "正在发送验证码"
    });
    commonApi
      .verifyCode({
        mobile: form.value.mobile,
        event: "register"
      })
      .then((res) => {
        uni.hideLoading();
        // 这里此提示会被start()方法中的提示覆盖
        uni.$u.toast("验证码已发送");
        // 通知验证码组件内部开始倒计时
        uCodeRef.value.start();
      });
  } else {
    uni.$u.toast("倒计时结束后再发送");
  }
};

const end = () => {
  uni.$u.toast("倒计时结束");
};

const start = () => {
  uni.$u.toast("倒计时开始");
};

// 注册
const onRegister = () => {
  if (!checked.value) {
    uni.showToast({
      title: "阅读并同意《用户协议》《隐私政策》",
      icon: "none"
    });
    return;
  }
  if (form.value.mobile.trim() == "") {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
      mask: true
    });
    return;
  }
  if (form.value.captcha.trim() == "") {
    uni.showToast({
      title: "请输入验证码",
      icon: "none",
      mask: true
    });
    return;
  }
  loginApi.register(form.value).then((res) => {
    if (res.code == 1) {
      // 用户登录信息保存到本地存储
      setUserInfo(res.data);
      uni.switchTab({ url: "/pages/tabbar/home" });
    }
    if (res.code == 2) {
      tipInfo.value = {
        title: res.msg,
        time: res.data.createtime,
        invitation_code: res.data.invitation_code
      };
      overlayShow.value = true;
    }
  });
};

// 选中用户协议&&隐私政策
const onCheckDefault = () => {
  checked.value = !checked.value;
};

// 用户协议&&隐私政策
const onAgreement = (type) => {
  uni.navigateTo({ url: `/pagesB/agreement/index?type=${type}` });
};
</script>

<style lang="stylus" scoped>
.register
  .bj
    width: 100vw;
    height: 100vh;
  .container
    box-sizing: border-box;
  .icon-width
    width: 40rpx;
    height: 40rpx;
  .tip-text
    color: #0052D9;
  .btn-fixed
    position: fixed;
    bottom: 84rpx;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  .register-btn
    width: 600rpx;
    height: 100rpx;
    line-height: 100rpx;
    background: #0052D9;
    border-radius: 100rpx;
    color: #ffffff;
  .register-btn:after
    border: none;
  .overlay-container
    height: 100vh;
    .overlay-main
      border-radius: 16rpx;
    .close-img
      width: 64rpx;
      height: 64rpx;
  :deep(.u-input)
    padding: 0rpx 18rpx !important;
    background: #ffffff;
    border: 2rpx solid #E6E6E6;
    border-radius: 24rpx;
  :deep(.u-input__content)
    height: 100rpx;
    line-height: 100rpx;
  :deep(.uni-input-wrapper)
    font-size: 32rpx;
</style>
