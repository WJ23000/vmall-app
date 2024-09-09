<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-08 17:05:16
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.flex.row
  view.pk-row(v-for="(item, index) in shopList" :key="index")
    view.relative.pl-16.h-48.f-32-B
    view.pk-cell.flex.row.mt-16
      view.item.flex.column.w-272.h-320.bg-white.px-16
        view.py-12
          view.h-80.lh-40.f-28-B.ellipsis-2 {{ item?.name }}
          view.price.flex.justify-center.my-20.f-28-B 价格：{{ currentPrice[index] }}元
          view.flex.items-center
            image.mr-4.w-24.h-24(:src="Left")
            view.images.flex1
              image.mr-8.w-72.h-72(
                v-for="(record, rindex) in item.images" 
                :key="rindex"
                :src="record" 
                @click="onPreviewImage(item.images, rindex)")
              //- image.w-72.h-72(:src="QrCode")
            image.ml-4.w-24.h-24(:src="Right")
          view.flex.justify-between.items-center.mt-20 
            view.collect-btn.flex.justify-center.items-center.w-124.h-44.lh-44(@click="onCollect(item, index)") 
              image.w-28.h-28(v-if="item.is_collected == 1" :src="CollectActive")
              image.w-28.h-28(v-else :src="Collect")
              text.ml-12 {{ item.is_collected == 1 ? "收藏" : "未收藏" }}
            image.w-32.h-32(:src="Delete" @click="onPool(item, index)")
    //- view.separation.mt-24
    view.relative.mt-28.pl-16.h-48.f-32-B
    view.table.mt-24.f-24  
      view.cell.flex.justify-center.items-center.px-16.w-272.h-80.lh-80.tc
        view.mr-20.w-32.h-32(
          v-for="(citem, cindex) in item?.color_price_list" 
          :style="{backgroundColor: citem.color}"
          :class="[currentPrice[index] == citem.price ? 'active' : '']"
          @click="onColorPrice(index, citem)")
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.appearance_surface }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.appearance_pattern }}
    view.relative.mt-28.pl-16.h-48.f-32-B
    view.table.mt-24.f-24  
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.shaft_material }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.shaft_handle_material }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.shaft_coating }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.shaft_hardness }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.shaft_taper }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.shaft_tip_diameter }}
    view.relative.mt-28.pl-16.h-48.f-32-B
    view.table.mt-24.f-24  
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.grip_material }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.grip_sensation }}
    view.relative.mt-28.pl-16.h-48.f-32-B
    view.table.mt-24.f-24  
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.structure }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.joint }}
      view.cell.px-16.w-272.h-80.lh-80.tc {{ item.weight }}
      view.cell.px-16.w-272.h-80.lh-80.tc.ellipsis-1 {{ item.counterweight }}
      view.cell.px-16.w-272.h-80.lh-80.tc.ellipsis-1 {{ item.use_case }}
      view.cell.px-16.w-272.h-80.lh-80.tc.ellipsis-1 {{ item.player_type }}
    view.relative.mt-28.pl-16.h-48.f-32-B
    view.table.mt-24.f-24  
      view.cell.flex.justify-center.items-center.px-16.w-272.h-80.lh-80.tc
        up-rate(count="5" v-model="item.advantages_cue_ball_control" inactiveColor="#C0C4CC" activeColor="#FFAF2A" :allowHalf="true" readonly)
      view.cell.flex.justify-center.items-center.px-16.w-272.h-80.lh-80.tc 
        up-rate(count="5" v-model="item.advantages_power_transfer" inactiveColor="#C0C4CC" activeColor="#FFAF2A" :allowHalf="true" readonly)
      view.cell.flex.justify-center.items-center.px-16.w-272.h-80.lh-80.tc 
        up-rate(count="5" v-model="item.advantages_feel" inactiveColor="#C0C4CC" activeColor="#FFAF2A" :allowHalf="true" readonly)
      view.cell.flex.justify-center.items-center.px-16.w-272.h-80.lh-80.tc 
        up-rate(count="5" v-model="item.advantages_balance" inactiveColor="#C0C4CC" activeColor="#FFAF2A" :allowHalf="true" readonly)
      view.cell.flex.justify-center.items-center.px-16.w-272.h-80.lh-80.tc 
        up-rate(count="5" v-model="item.advantages_durability" inactiveColor="#C0C4CC" activeColor="#FFAF2A" :allowHalf="true" readonly)
      view.cell.flex.justify-center.items-center.px-16.w-272.h-80.lh-80.tc 
        up-rate(count="5" v-model="item.advantages_overall_rating" inactiveColor="#C0C4CC" activeColor="#FFAF2A" :allowHalf="true" readonly)
</template>

<script setup>
import { IMG_URL } from "@/config";
// 服务器图片
import Left from "@/static/images/left.png";
import Right from "@/static/images/right.png";
const QrCode = ref(IMG_URL + "/assets/wp/qr_code.png");
import Collect from "@/static/images/collect.png";
import CollectActive from "@/static/images/collect-active.png";
import Delete from "@/static/images/delete.png";

const emit = defineEmits(["colorPrice", "collect", "pool"]);
const props = defineProps({
  feature: {
    type: String,
    default: "1" // 1显示、2不显示
  },
  shopList: {
    type: Array,
    default: () => {
      return [];
    }
  },
  currentPrice: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

// 切换颜色价格
const onColorPrice = (index, item) => {
  emit("colorPrice", index, item);
};

// 收藏/取消收藏
const onCollect = (item, index) => {
  emit("collect", item, index);
};

// 添加/删除商品到对比池
const onPool = (item, index) => {
  emit("pool", item, index);
};

// 预览图片
const onPreviewImage = (imagePaths, index) => {
  uni.previewImage({
    urls: imagePaths,
    current: index
  });
};
</script>

<style lang="stylus" scoped>
.pk-row
  .line:before
    position: absolute;
    left: 0;
    top: 8rpx;
    content: '';
    width: 6rpx;
    height: 36rpx;
    background: #303133
  .pk-cell
    .item
      background: #F5F5F5;
      border-top: 2rpx solid #E6E6E6;
      border-bottom: 2rpx solid #E6E6E6;
      border-right: 2rpx solid #E6E6E6;
    .item:nth-child(3n)
      border-radius: 0rpx 16rpx 16rpx 0rpx;
    .price
      color: #FD273F;
    .images
      overflow-x: auto;
      white-space: nowrap;
    .collect-btn
      background: #FFFFFF;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      border: 2rpx solid #E6E6E6;
      text
        font-size: 20rpx;
        color: #909193;
  .pk-cell:nth-child(3n)
  // .separation
  //   background: #f5f5f5;
  //   height: 4rpx;
  .table
    .cell
      background: #F5F5F5;
      color: #606266;
      border-top: 2rpx solid #e6e6e6;
      border-right: 2rpx solid #e6e6e6;
    .cell:first-child
      border-top: 2rpx solid #e6e6e6;
    .cell:last-child
      border-bottom: 2rpx solid #e6e6e6;
.pk-row:nth-child(3n)
  .pk-cell
    .item
      border-radius: 0rpx 16rpx 16rpx 0rpx;
.pk-row:last-child
  .table
    .cell
      background: #F5F5F5;
      color: #606266;
      border-top: 2rpx solid #e6e6e6;
      border-right: 2rpx solid #e6e6e6;
    .cell:first-child
      border-top: 2rpx solid #e6e6e6;
      border-radius: 0rpx 16rpx 0rpx 0rpx;
    .cell:last-child
      border-bottom: 2rpx solid #e6e6e6;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
.active
  border: 2rpx solid #FD273F;
</style>
