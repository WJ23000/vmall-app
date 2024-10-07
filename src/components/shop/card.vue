<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-24 09:04:01
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.shop-card.px-32.py-32.bg-white
  //- view.mb-24
  //-   image.img(:src="Shop")
  //-   text.f-28-B {{ item.store_name }}
  view.flex
    image.cover.mr-28(:src="item.image")
    view.flex.column.flex1
      view.cart-title.flex.justify-start.items-center
        //- view.type.mr-16.f-28 海淘
        view.flex1.f-28 {{ item.shop_name }}
      //- view.mt-8.f-28 {{ item.name }}
      //- view.mt-8.f-28 进口税（含运费税款）：商品已含税
      view.flex.justify-between.mt-78
        text.price.f-32-B ￥{{ item.price }}
        text.f-28 ×1
</template>

<script setup>
const props = defineProps({
  item: {}
});
</script>

<style lang="scss" scoped>
.shop-card {
  .img {
    margin-right: 12rpx;
    width: 40rpx;
    height: 40rpx;
    vertical-align: text-bottom;
  }
  .cover {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
  }
  .cart-title {
    height: 80rpx;
    line-height: 40rpx;
  }
  .type {
    width: 96rpx;
    text-align: center;
    height: 56rpx;
    line-height: 56rpx;
    background: #6a1b99;
    color: #ffffff;
    border-radius: 12rpx;
  }
  .price {
    color: #fa3534;
  }
}
</style>
