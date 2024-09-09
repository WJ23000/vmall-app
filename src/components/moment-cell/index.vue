<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-08 17:11:12
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.moment-cell
  view.item.flex.column.mb-8.px-32.py-24.bg-white(v-for="(item, index) in momentList" :key="index")
    view.flex.justify-between
      view.flex.items-center
        image.cover.mr-28.w-64.h-64.br-100(:src="item.avatar")
        text.f-30.bold {{ item.username }}
      view.f-28.blue(v-if="item.status == 2") #求购
    view.mt-24.f-26(v-if="item.status == 2")
      view.mb-8.ellipsis-1 车型：{{ item.typeName }}
      view.mb-8 预算价格：{{ item.price }}
      view.mb-8 公里：{{ item.mileage }}
      view.mb-8 颜色：{{ item.color }}
      view.mb-8 车况配置：{{ item.deploy }}
      view.mb-8 求购范围：{{ item.scope }}
      view 其他要求：{{ item.demand }}
    view.mt-24.f-26(v-if="item.status == 1") {{ item.describe }}
    view.imgs
      image.mt-24.mr-12.w-220.h-220.br-8(
        v-for="(record, index) in item.imgs"
        :key="index"
        :src="record"
        @click="onPreviewImage(item.imgs, index + 1)")
    view.flex.justify-between.mt-26.f-22(v-if="type == 1")
      view.info.flex
        text {{ item.publishTime }}
        u-line(direction="col" color="#c6c6c6" length="80%" margin="6rpx 12rpx")
        text {{ item.location }}
      view.flex(v-if="item.status == 2")
        view.flex.items-center
          image.mr-8.w-33.h-33(:src="ContactPlatform")
          text 联系平台
        view.flex.ml-32.items-center
          image.mr-8.w-33.h-33(:src="ContactCarFans")
          text 联系车友
      view.flex(v-if="item.status == 1") # {{ item.publishLocation }}
    view.flex.justify-between.mt-26.f-22(v-else)
      view.info.flex
        text {{ item.publishTime }}
        u-line(direction="col" color="#c6c6c6" length="80%" margin="6rpx 12rpx")
        text {{ item.location }}
      view.flex.items-center
        view.flex.items-center(@click="onDelete")
          image.mr-8.w-33.h-33(:src="Delete")
          text 删除
        view.flex.items-center.ml-32(@click="onEdit(item)")
          image.mr-8.w-33.h-33(:src="Edit")
          text 编辑
        image.ml-32.mr-8.w-33.h-33(:src="Share")
  //- 提交确认
  ModelConfirm(v-if="modelConfirmShow" @cancel="modelConfirmShow = false" @confirm="onModelConfirm")
</template>

<script setup>
import { IMG_URL } from "@/config";
import ModelConfirm from "@/components/model-confirm/index.vue";
// 服务器图片
const ContactCarFans = ref(IMG_URL + "/contact-car-fans.png");
const ContactPlatform = ref(IMG_URL + "/contact-platform.png");
const Delete = ref(IMG_URL + "/detail/delete.png");
const Edit = ref(IMG_URL + "/detail/edit.png");
const Share = ref(IMG_URL + "/detail/share.png");

const props = defineProps({
  type: {
    type: String,
    default: "1" // 1默认、2发布的求购
  }
});
const momentList = ref([]);
const modelConfirmShow = ref(false);

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    momentList.value.push({
      id: i,
      avatar: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      username: "大黑",
      describe: "保时捷求购一辆99新的保时捷,预算30万有好车的请尽快与我联系，型号如下图",
      imgs: [
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper3.png"
      ],
      typeName: "2022款保时捷macan新款汽车",
      price: "交易担保",
      mileage: "2.5万公里",
      color: "白色",
      deploy: "良好",
      scope: "全国",
      demand: "无其他要求",
      publishTime: "一小时前",
      location: "金门县",
      publishLocation: "双龙",
      status: i == 0 ? 2 : 1
    });
  }
});

// 预览图片
const onPreviewImage = (imagePaths, index) => {
  uni.previewImage({
    urls: imagePaths,
    current: index - 1
  });
};

// 求购
const onCarPurchase = () => {
  uni.navigateTo({ url: "/pagesA/car-purchase/index" });
};

// 删除
const onDelete = () => {
  modelConfirmShow.value = true;
};
const onModelConfirm = () => {
  modelConfirmShow.value = false;
  uni.showToast({
    title: "删除成功",
    icon: "none",
    mask: true
  });
};

// 编辑
const onEdit = (item) => {
  uni.navigateTo({ url: "/pagesA/car-purchase/index?id=" + item.id });
};
</script>

<style lang="stylus" scoped>
.moment-cell
  .imgs
    image:nth-child(3n)
      margin-right: 0rpx;
  .info
    color: #888888;
</style>
