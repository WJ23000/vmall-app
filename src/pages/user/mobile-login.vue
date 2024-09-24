<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-26 11:38:46
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.register
  image.bj.absolute(:src="ApplyBj")
  view.container.absolute.w100.flex.column.justify-center.px-32
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
        u-code(
          ref="uCodeRef"
          :seconds="seconds"
          startText="发送验证码"
          @change="codeChange")
        text.tip-text.f-32(@tap="getCode") {{ tips }}
  view.btn-fixed.flex.column.justify-center.items-center
    button.mobile-login-btn.f-32-B.white(@click="onMobileLogin") 登录
    view.flex.justify-center.items-center.mt-28.f-28(@click="onCheckDefault")
      image.icon-width.mr-8(v-if="checked" :src="AgreementXz")
      image.icon-width.mr-8(v-else :src="AgreementWxz")
      text 我已阅读并同意
      text.tip-text(@click.stop="onAgreement(1)") 《用户协议》
      text.tip-text(@click.stop="onAgreement(2)") 《隐私政策》
</template>

<script setup>
import { IMG_URL } from "@/config";
import { getStorage } from "@/utils/storage";
import { setUserInfo, getInvitationCode, removeInvitationCode } from "@/service";
import { loginApi, commonApi } from "@/api";
// 服务器图片
const ApplyBj = ref(IMG_URL + "/images/apply-bj.png");
const AgreementXz = ref(IMG_URL + "/images/agreement-xz.png");
const AgreementWxz = ref(IMG_URL + "/images/agreement-wxz.png");
const OverlayClose = ref(IMG_URL + "/images/overlay-close.png");
const form = ref({
  mp_openid: "",
  mobile: "",
  captcha: "",
  invitation_code: ""
});
const tips = ref("");
const seconds = ref(60);
const uCodeRef = ref(null);
const checked = ref(false);
const overlayShow = ref(false);

onLoad(() => {
  wxLogin();
  form.value.invitation_code = getInvitationCode();
});

// 微信授权
const wxLogin = () => {
  uni.login({
    provider: "weixin",
    onlyAuthorize: true,
    success: (res) => {
      loginApi
        .authorInfo({
          js_code: res.code
        })
        .then((res) => {
          form.value.mp_openid = res.data.mp_openid;
        });
    }
  });
};

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
        event: "captcha_login"
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

// 手机号验证码登录
const onMobileLogin = () => {
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
  loginApi.mobileLogin(form.value).then((res) => {
    if (res.code == 1) {
      // 用户登录信息保存到本地存储
      setUserInfo(res.data);
      // 删除使用过的邀请码
      removeInvitationCode();
      // 返回上一页
      const backPage = getStorage("back_to_page");
      if (backPage) {
        const backPageType = backPage.match(/tabbar/g);
        if (backPageType) {
          uni.switchTab({ url: backPage });
        } else {
          uni.redirectTo({ url: backPage });
        }
      } else {
        uni.switchTab({ url: "/pages/tabbar/home" });
      }
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
  .mobile-login-btn
    width: 600rpx;
    height: 100rpx;
    line-height: 100rpx;
    background: #0052D9;
    border-radius: 100rpx;
    color: #ffffff;
  .mobile-login-btn:after
    border: none;
  .overlay-container
    height: 100vh;
    .overlay-main
      border-radius: 16rpx;
    .close-img
      width: 64rpx;
      height: 64rpx;
  ::v-deep(.u-input)
    padding: 0rpx 18rpx !important;
    background: #ffffff;
    border: 2rpx solid #E6E6E6;
    border-radius: 24rpx;
  ::v-deep(.u-input__content)
    height: 100rpx;
    line-height: 100rpx;
  ::v-deep(.uni-input-wrapper)
    font-size: 32rpx;
</style>
