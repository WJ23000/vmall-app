<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-23 18:12:17
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.order-logistics.px-32.py-32.bg-white
  view.flex
    image.cover.mr-28(:src="item.goods_spec_image")
    view.flex.column.flex1
      view.flex.mt-8.f-28
        view.title 订单编号：
        view {{ item.order_no }}
      view.flex.mt-40.f-28
        view.title 物流公司：
        view {{ item.express_company }}
      view.flex.mt-40.f-28
        view.title 物流单号：
        view {{ item.express_no }}
</template>

<script setup>
import { IMG_URL } from "@/config";
// 服务器图片
import Shop from "@/static/images/shop.png";

const props = defineProps({
  item: {}
});
</script>

<style lang="stylus" scoped>
.order-logistics
  .img
    margin-right: 12rpx;
    width: 40rpx;
    height: 40rpx;
    vertical-align: text-bottom;
  .cover
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
  .title
    color: #909193;
</style>
