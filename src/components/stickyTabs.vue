<template lang="pug">
view.sticky-tabs.flex.justify-center
  up-tabs(
    :list="tabList"
    :scrollable="false",
    lineWidth="30",
    lineColor="#f56c6c",
    :activeStyle="activeStyle",
    :inactiveStyle="inactiveStyle",
    itemStyle="padding: 0px 15px; height: 44px;",
    @click="onTabClick")
</template>

<script setup>
const props = defineProps({
  tabList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

const activeStyle = ref({
  color: "#303133",
  fontSize: "28rpx",
  fontWeight: "bold",
  transform: "scale(1.05)"
});
const inactiveStyle = ref({
  color: "#606266",
  fontSize: "28rpx",
  transform: "scale(1)"
});

const onTabClick = (item) => {
  console.log("点击", item);
};
</script>

<style lang="scss" scoped></style>
