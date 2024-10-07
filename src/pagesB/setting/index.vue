<template lang="pug">
view.vmall-setting
	up-cell-group
		up-cell(
			v-for="(item,index) in otherCellList"
			:key="index"
			:title="item.title"
			:value="item.value"
			:isLink="item.isLink"
			@click="toNextPage(item.url)")
	up-gap(height="10", bgColor="#ededed")
	up-cell-group
		up-cell(
			v-for="(item,index) in otherCellListTwo"
			:key="index"
			:title="item.title"
			:value="item.value"
			:isLink="item.isLink"
			@click="toNextPage(item.url)")
	up-gap(height="10", bgColor="#ededed")
	view.exit-login(@click="onExitLogin") 退出登录
</template>

<script setup>
const otherCellList = ref([
  {
    title: "地址管理",
    value: "",
    isLink: true,
    url: "/pagesA/address/index"
  },
  {
    title: "账户与安全",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "支付设置",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "发票抬头管理",
    value: "添加增票资质",
    isLink: true,
    url: ""
  },
  {
    title: "通用",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "消息通知设置",
    value: "",
    isLink: true,
    url: ""
  }
]);

const otherCellListTwo = ref([
  {
    title: "PLUS会员",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "功能反馈",
    value: "",
    isLink: true,
    url: "/pagesB/feedback/index"
  },
  {
    title: "关于APP",
    value: "发现新版本",
    isLink: true,
    url: ""
  },
  {
    title: "隐私设置",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "隐私政策简要版",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "个人信息收集清单",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "应用权限说明",
    value: "",
    isLink: true,
    url: ""
  },
  {
    title: "第三方共享个人信息清单",
    value: "",
    isLink: true,
    url: ""
  }
]);

const loginCellList = ref([
  {
    title: "退出登录",
    value: "",
    isLink: false,
    url: ""
  }
]);

// 去往其他模块
const toNextPage = (url) => {
  uni.navigateTo({
    url
  });
};

// 退出登录
const onExitLogin = () => {
  // #ifdef H5
  uni.showToast({
    title: "H5暂不支持该功能",
    icon: "none"
  });
  return false;
  // #endif
  uni.removeStorage({
    key: "accountInfo",
    success: function (res) {
      uni.$emit("refresh", { refresh: true });
      // 返回我的页面
      uni.navigateBack({
        delta: 1
      });
    }
  });
};
</script>

<style lang="scss">
// APP窗口背景色默认白色，需用此种方式调整窗口背景色
page {
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.vmall-setting {
  background-color: #ffffff;
  .exit-login {
    padding: 30rpx 0rpx;
    text-align: center;
  }
}
</style>
