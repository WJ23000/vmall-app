<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-20 09:41:14
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.page-layout
  view.header.fixed.z-300.w100(:style="{background: bgColor}")
    view.flex.items-center.px-24.h-88
      u-search.flex1(
        bgColor="#ffffff"
        height="64rpx"
        searchIconSize="32rpx"
        :inputStyle="inputStyle"
        placeholder="搜索商品的品牌/型号/类型"
        :showAction="false"
        @change="onSearch"
        @clear="onClear")
  view.content
    slot(name="content")
</template>

<script setup>
const emit = defineEmits(["search"]);
const props = defineProps({
  city: {
    type: String,
    default: "全国"
  },
  bgColor: {
    type: String,
    default: "#f9f9f9"
  }
});

const inputStyle = ref({
  fontSize: "22rpx"
});

const onSearch = (value) => {
  emit("search", value);
};

const onClear = () => {
  emit("search", "");
}
</script>

<style lang="stylus" scoped>
.page-layout
  .header
    top: 0rpx;
</style>
