import { initEasycoms } from '@dcloudio/uni-cli-shared';
<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-14 09:11:08
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.grid
  u-grid(:border="false" col="5")
    u-grid-item(
      v-for="(item, index) in gridList"
      :key="index"
      @click="onGridPath(item)")
      view.flex.column.py-16
        image.w-104.h-104(:src="item.icon")
        text.mt-16.f-24.bold {{ item.title }}
</template>

<script setup>
import { IMG_URL } from "@/config";
// 服务器图片
const CarText = ref(IMG_URL + "/home/car-text.png");
const CarPublish = ref(IMG_URL + "/home/car-publish.png");
const CarBuy = ref(IMG_URL + "/home/car-buy.png");
const CarVip = ref(IMG_URL + "/home/car-vip.png");
const CarDiscern = ref(IMG_URL + "/home/car-discern.png");

const emit = defineEmits(["change"]);
const gridList = ref([
  {
    icon: CarText,
    title: "车源文案", // 免费功能 普通用户也可以使用
    path: "/pagesB/car-text/index"
  },
  {
    icon: CarPublish,
    title: "发布车源", // 普通用户每天限发3条，发完三条后再最后一步，点击发布，页面跳转会员办理页面
    path: "/pagesB/car-publish/one"
  },
  {
    icon: CarBuy,
    title: "发布求购", // 普通用户与会员用户都无上限
    path: "/pagesA/car-purchase/index"
  },
  {
    icon: CarVip,
    title: "会员入群", // 普通用户也可点击，看到后台配置的二维码，可复制后台配置的微信号
    path: "/pagesB/vip/index"
  },
  {
    icon: CarDiscern,
    title: "车辆识别", // 用户每天3次免费查询，超过3次，每次需收费2元；
    path: "/pagesB/car-discern/index"
  }
]);

const onGridPath = (item) => {
  if (item.title == "会员入群") {
    emit("change");
    return;
  }
  uni.navigateTo({ url: item.path });
};
</script>

<style lang="stylus" scoped></style>
