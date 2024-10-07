<template lang="pug">
view.fixed-search.flex.items-center(:style="{background: bgColor}")
  view.flex.flex1(@click="onSearch")
    up-search(
      placeholder="护肤品"
      :showAction="false"
      disabled
      style="pointer-events: none;")
  view.ml-12
    up-icon(name="scan" :color="scanColor" size="28" @click="onScanCode")
</template>

<script setup>
const props = defineProps({
  bgColor: {
    type: String,
    default: ""
  },
  scanColor: {
    type: String,
    default: "#909193"
  }
});

// 扫码触发
const onScanCode = (e) => {
  // #ifdef H5
  uni.showToast({
    title: "H5暂不支持该功能",
    icon: "none"
  });
  return false;
  // #endif
  uni.scanCode({
    success: function (res) {
      console.log("条码类型：" + res.scanType);
      console.log("条码内容：" + res.result);
    }
  });
};

// 搜索
const onSearch = () => {
  console.log("触发了不")
  uni.navigateTo({
    url: "/pagesA/search/index"
  });
};
</script>

<style lang="scss" scoped>
.fixed-search {
  position: fixed;
  top: 0;
  /* #ifdef APP-PLUS */
  top: var(--status-bar-height);
  /* #endif */
  width: 100%;
  background: #ffffff;
  padding: 12rpx 24rpx;
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
</style>
