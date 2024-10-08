<script>
import { TUILogin } from "@tencentcloud/tui-core";
// #ifdef APP-PLUS || H5
import { TUIChatKit } from "./TUIKit";
TUIChatKit.init();
// #endif

let vueVersion = 3;
// #ifdef VUE3
vueVersion = 3;
// #endif

// Required information
// You can get userSig from TencentCloud chat console for Testing TUIKit.
// Deploy production environment please get it from your server.
// View https://cloud.tencent.com/document/product/269/32688
uni.$SDKAppID = 1600055634; // Your SDKAppID
uni.$userID = "a001"; // Your userID
uni.$userSig = "eJwtzF0LgjAYhuH-suOQObc5hE5K*oAkSAPZmbgVL7occ4QQ-feWevhcD9wfVF3K6K0dyhCJMNrMG5R*eXjAzA3G8eqj6hprQaEs5hhjxnhCl0dPFpwOzhgj4VrUg-lbSkTCUyr4WoFnyOb3djD9gYuhF5Xvcl77otnRvTmaEuRVajmedH2bCnfeou8PlkIw0Q__"; // Your userSig

export default {
  onLaunch: function () {
    TUILogin.login({
      SDKAppID: uni.$SDKAppID,
      userID: uni.$userID,
      userSig: uni.$userSig,
      useUploadPlugin: true, // If you need to send rich media messages, please set to true.
      framework: `vue${vueVersion}` // framework used vue2 / vue3
    }).catch(() => {});
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  }
};
</script>

<style lang="scss">
/* 公共css */
@import "uview-plus/index.scss";
@import url("./styles/index.scss");

/* 这种写法会影响主包大小需注意 */
@for $i from 1 through 100 {
  .f-#{$i} {
    font-size: #{$i}rpx;
  }

  .f-#{$i}-M {
    font-weight: 500;
    font-size: #{$i}rpx;
  }

  .f-#{$i}-B {
    font-weight: bold;
    font-size: #{$i}rpx;
  }

  .px-#{$i} {
    padding-left: #{$i}rpx;
    padding-right: #{$i}rpx;
  }

  .py-#{$i} {
    padding-top: #{$i}rpx;
    padding-bottom: #{$i}rpx;
  }

  .pl-#{$i} {
    padding-left: #{$i}rpx;
  }

  .pr-#{$i} {
    padding-right: #{$i}rpx;
  }

  .pt-#{$i} {
    padding-top: #{$i}rpx;
  }

  .pb-#{$i} {
    padding-bottom: #{$i}rpx;
  }

  .mx-#{$i} {
    margin-left: #{$i}rpx;
    margin-right: #{$i}rpx;
  }

  .my-#{$i} {
    margin-top: #{$i}rpx;
    margin-bottom: #{$i}rpx;
  }

  .ml-#{$i} {
    margin-left: #{$i}rpx;
  }

  .mr-#{$i} {
    margin-right: #{$i}rpx;
  }

  .mt-#{$i} {
    margin-top: #{$i}rpx;
  }

  .mb-#{$i} {
    margin-bottom: #{$i}rpx;
  }

  .w-#{$i} {
    width: #{$i}rpx;
  }

  .h-#{$i} {
    height: #{$i}rpx;
  }

  .line-#{$i} {
    line-height: #{$i}rpx;
  }

  .br-#{$i} {
    border-radius: #{$i}rpx;
  }

  .z-#{$i} {
    z-index: #{$i};
  }
}
</style>
