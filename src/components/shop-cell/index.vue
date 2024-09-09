import { initEasycoms } from '@dcloudio/uni-cli-shared';
<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-08 17:05:16
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.shop-cell.px-32
  view.item.flex.items-center.mb-20.bg-white.br-16.h-210(
    v-for="(item, index) in shopList"
    :key="index"
    @click="onShopDetail(item.id)")
    view.flex.flex1
      image.cover.w-280.h-210(:src="item.image")
      view.flex.column.flex1.px-20.py-16
        view.f-28-B.ellipsis-1 {{ item.name }}
        view.info.flex.mt-34.f-24
          view {{ item.shaft_material }}
          u-line(direction="col" color="#c6c6c6" length="80%" margin="6rpx 12rpx")
          view {{ item.weight }}
        view.info.flex.justify-between.mt-20
          view.price.f-36-B {{ item.price }}元
          //- is_pk: 1已加入，0未加入
          view.mx-20.pk.flex.justify-center.items-center.white(
            v-if="feature == '1'"
            @click.stop="onPool(item)") 
            image.w-32.h-32(v-if="item.is_pk == 1" :src="AddOk")
            image.w-32.h-32(v-else :src="Add")
            text 对比
</template>

<script setup>
import { IMG_URL } from "@/config";
import { baseApi } from "@/api";
// 服务器图片
import Add from "@/static/images/add.png";
import AddOk from "@/static/images/add-ok.png";

const emit = defineEmits(["updateNum"]);
const props = defineProps({
  type: {
    type: String,
    default: "1" // 1商品列表、2增选商品列表
  },
  feature: {
    type: String,
    default: "1" // 1商品收藏、2对比历史
  },
  shopList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

// 添加/删除商品到对比池
const onPool = (item) => {
  baseApi.pool({ goods_id: item.id }).then((res) => {
    if (res.code == 1) {
      if (props.type == "1") {
        item.is_pk = res.data.is_pk;
        emit("updateNum");
      }
      if (props.type == "2") {
        item.is_pk = res.data.is_pk;
        uni.redirectTo({ url: "/pagesA/pk/index?form=1" });
      }
    }
  });
};

// 商品详情
const onShopDetail = (id) => {
  uni.navigateTo({ url: "/pagesA/detail/index?id=" + id });
};
</script>

<style lang="stylus" scoped>
.shop-cell
  .item:last-child
    margin-bottom: 0rpx;
  .cover
    border-radius: 16rpx 0rpx 0rpx 16rpx;
  .assure
    width: 96rpx;
    height: 34rpx;
    line-height: 34rpx;
    background: #42C62D;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    border: 2rpx solid #42C62D;
    font-size: 18rpx;
  .pk
    width: 108rpx;
    height: 50rpx;
    line-height: 50rpx;
    background: #303133;
    border-radius: 12rpx;
    font-size: 24rpx;
  .info
    color: #888888;
    .price
      color: #FD273F;
</style>
