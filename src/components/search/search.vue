<template lang="pug">
view.search.flex.items-center
  up-search.flex.flex1(
    placeholder="护肤品", 
    :showAction="false",
    :disabled="true",
    @click="onSearch")
  view.ml-12
    u-icon(name="scan", color="#ffffff", size="28", @click="onScanCode")
</template>

<script setup>
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
  uni.navigateTo({
    url: "/pages/packageA/search/search"
  });
}
</script>

<style lang="scss" scoped></style>
