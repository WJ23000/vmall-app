import { initEasycoms } from '@dcloudio/uni-cli-shared';
<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-02-29 14:15:55
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.car-grid
  view.flex.justify-between.pt-16.items-center.px-32
    text.f-32.bold 车友圈
    text.f-24.blue 查看更多
  view.px-20
    u-grid(:border="false" col="4" @click="click")
      u-grid-item(
        v-for="(item, index) in carGridList"
        :key="index")
        view.cell.flex.column.items-center.mt-16.py-16.bg-white.br-16
          text.f-24.bold {{ item.title }}
          text.mt-8.f-18.blue 今日新增{{ item.count }}
</template>

<script setup>
const carGridList = ref([
  {
    title: "中华",
    count: 2
  },
  {
    title: "比亚迪",
    count: 2
  },
  {
    title: "迈巴赫",
    count: 2
  },
  {
    title: "长城",
    count: 2
  },
  {
    title: "法拉利",
    count: 2
  },
  {
    title: "奥迪",
    count: 2
  },
  {
    title: "吉利全球鹰",
    count: 2
  },
  {
    title: "夏利",
    count: 2
  },
]);
</script>

<style lang="stylus" scoped>
.car-grid
  .cell
    width: 80%;
    padding-right: 16rpx;
</style>
