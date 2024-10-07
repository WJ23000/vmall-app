<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-11 11:00:52
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.login.flex.column.justify-center.items-center
  view.flex.column.justify-center.items-center
    image.w-750.h-420(:src="LoginBj")
    image.logo(:src="Logo")
  view.container.mt-74.w100
    view.form.mt-40.px-48.flex.column.justify-center
      view.mt-32.f-36-B 手机号
      up-input(
        fontSize="32rpx"
        color="#909193"
        placeholder="请输入手机号"
        type="number"
        border="bottom"
        v-model="form.mobile")
      view.mt-72.f-36-B 验证码
      up-input(
        fontSize="32rpx"
        color="#909193"
        placeholder="请输入验证码"
        border="bottom"
        v-model="form.captcha")
        template(#suffix)
          up-code(
            ref="uCodeRef"
            :seconds="seconds"
            startText="获取验证码"
            @change="codeChange")
          text.tip-text.f-28(@tap="getCode") {{ tips }}
    //- view.btn-fixed.flex.column.justify-center.items-center
    button.login-btn.mt-86.f-32.white(@click="onMobileLogin")
      text 登录
    view.flex.items-center.mt-28.px-48.f-28(@click="onCheckDefault")
      image.icon-width.mr-8(v-if="checked" :src="AgreementXz")
      image.icon-width.mr-8(v-else :src="AgreementWxz")
      text 我已阅读并同意
      text.tip-text(@click.stop="onAgreement") 《PK服务条款》
    view.divider.flex.justify-center.items-center.mt-88.mb-28
      view.line 
      view.text.f-24 其它登录方式
      view.line 
    //- 抖音手机号授权登录
    button.dy-login-btn.f-32-B.white(open-type="getPhoneNumber" @getphonenumber="getPhoneNumber")
      image.w-80.h-80(:src="DyLogo")
    //- 抖音信息授权登录
    //- button.dy-login-btn.f-32-B.white
    //-   image.w-80.h-80(:src="DyLogo" @tap="getUserProfile" data-eventsync="true")
    view.phone.flex.justify-center.mt-86.pb-40.f-24(@click="onPhoneClick") 官方服务热线：{{ contactInfo?.official_phone }}
</template>

<script setup>
import { IMG_URL } from "@/config";
import { loginApi, commonApi, baseApi } from "@/api";
import { getStorage } from "@/utils/storage";
import { setUserInfo } from "@/service";
// 服务器图片
import Logo from "@/static/logo.png";
import LoginBj from "@/static/images/login/login-bj.png";
import AgreementXz from "@/static/images/login/agreement-xz.png";
import AgreementWxz from "@/static/images/login/agreement-wxz.png";
import DyLogo from "@/static/images/login/dy-logo.png";
const form = ref({
  mobile: "",
  captcha: ""
});
const tips = ref("");
const seconds = ref(60);
const uCodeRef = ref(null);
const checked = ref(false);
const authorInfo = ref();
const contactInfo = ref();

onLoad(() => {
  wxLogin();
  getContactInfo();
});

// 抖音授权
const wxLogin = () => {
  uni.login({
    provider: "toutiao",
    onlyAuthorize: true,
    success: (res) => {
      console.log("授权数据", res);
      loginApi
        .douyinAuth({
          anonymous_code: res.anonymousCode,
          code: res.code
        })
        .then((res) => {
          authorInfo.value = res.data;
        });
    }
  });
};

// 抖音手机号授权登录
const getPhoneNumber = (e) => {
  const phoneAuthor = e;
  if (phoneAuthor.detail.iv) {
    if (!checked.value) {
      uni.showToast({
        title: "阅读并同意《PK服务条款》",
        icon: "none"
      });
      return;
    }
    loginApi
      .douyinLogin({
        server_key: authorInfo.value.server_key,
        encrypted_data: phoneAuthor.detail.encryptedData,
        iv: phoneAuthor.detail.iv
      })
      .then((res) => {
        if (res.code == 1) {
          // 用户登录信息保存到本地存储
          setUserInfo(res.data.userinfo);
          uni.switchTab({ url: "/pages/tabbar/home" });
        }
      });
  }
};

// 抖音信息登录
const getUserProfile = () => {
  uni.getUserProfile({
    success(res) {
      console.log("getUserProfile 调用成功：", res.userInfo);
      if (!checked.value) {
        uni.showToast({
          title: "阅读并同意《PK服务条款》",
          icon: "none"
        });
        return;
      }
      loginApi
        .douyinLogin({
          server_key: authorInfo.value.server_key,
          encrypted_data: "",
          iv: "",
          avatar: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
        .then((res) => {
          if (res.code == 1) {
            // 用户登录信息保存到本地存储
            setUserInfo(res.data.userinfo);
            uni.switchTab({ url: "/pages/tabbar/home" });
          }
        });
    },
    fail(res) {
      console.log("getUserProfile 调用失败", res);
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
      title: "正在获取验证码"
    });
    commonApi
      .sendSms({
        mobile: form.value.mobile,
        event: "mobilelogin"
      })
      .then((res) => {
        uni.hideLoading();
        // 这里此提示会被start()方法中的提示覆盖
        uni.$u.toast("验证码已发送");
        // 通知验证码组件内部开始倒计时
        uCodeRef.value.start();
      });
  } else {
    uni.$u.toast("倒计时结束后再获取");
  }
};

// 手机号验证码登录
const onMobileLogin = () => {
  if (!checked.value) {
    uni.showToast({
      title: "阅读并同意《PK服务条款》",
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
      setUserInfo(res.data.userinfo);
      uni.switchTab({ url: "/pages/tabbar/home" });
    }
  });
};

// 选中服务条款
const onCheckDefault = () => {
  checked.value = !checked.value;
};

// 服务条款
const onAgreement = () => {
  uni.navigateTo({ url: `/pagesA/agreement/index` });
};

// 获取官方信息
const getContactInfo = () => {
  baseApi.contactInfo().then((res) => {
    contactInfo.value = res.data;
  });
};

// 拨打电话
const onPhoneClick = () => {
  uni.makePhoneCall({
    phoneNumber: contactInfo.value.official_phone,
    success(res) {
      // 调用成功 makePhoneCall:ok
      console.log("调用成功", res.errMsg);
    },
    fail(res) {
      // 调用失败 makePhoneCall:fail
      console.log("调用失败", res.errMsg);
    }
  });
};
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
<style lang="stylus" scoped>
.login
  .logo
    margin-top: -340rpx;
    width: 240rpx;
    height: 240rpx;
  .container
    background: #ffffff;
    height: 100%;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
  .btn-fixed
    position: fixed;
    bottom: 84rpx;
    width: 100%;
    margin: 0 auto;
  .login-btn
    width: 654rpx;
    height: 92rpx;
    line-height: 92rpx;
    background: #303133;
    color: #ffffff;
    text-align: center;
    border-radius: 64px;
  .login-btn:after
    border: none;
  .dy-login-btn
    width: 654rpx;
    height: 92rpx;
    line-height: 92rpx;
    background: #ffffff;
    color: #ffffff;
    text-align: center;
    border-radius: 64px;
  .dy-login-btn:after
    border: none;
  .icon-width
    width: 40rpx;
    height: 40rpx;
  .tip-text
    color: #FFBF02;
  .divider
    .line
      width: 104rpx;
      height: 1rpx;
      background: #E6E6E6;
    .text
      color: #C0C4CC;
  .phone
    color: #C0C4CC;
  :deep(.u-input)
    padding: 0rpx !important;
    background: #ffffff;
  :deep(.u-input__content)
    height: 100rpx;
    line-height: 100rpx;
  :deep(.uni-input-wrapper)
    font-size: 32rpx;
</style>
