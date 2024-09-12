<template lang="pug">
view.vmall-home
  FixedSearch(v-if="backTop > 44")
  view.header
    view.pt-20
      Search
    view.pt-20
      Banner(:bannerList="bannerList")
    view.pt-20
      SlideGrid(:gridList="gridList")
  view.content
    up-sticky(:bgColor="stickyBgColor" :offset-top="offsetTop")
      StickyTabs(:tabList="tabList")
    view.px-10
      Waterfall(ref="waterfallRef" :loadStatus="loadStatus" :flowList.sync="flowList" @addRandomData="addRandomData")
  BackTop(:backTop="backTop")
</template>

<script setup>
import { random, guid } from "uview-plus";
import FixedSearch from "@/components/search/fixedSearch.vue";
import Search from "@/components/search/search.vue";
import Banner from "@/components/banner.vue";
import SlideGrid from "@/components/slideGrid.vue";
import StickyTabs from "@/components/stickyTabs.vue";
import Waterfall from "@/components/waterfall.vue";
import BackTop from "@/components/backTop.vue";
import { BANNER_DATA, GRID_DATA, TAB_DATA, GOODS_DATA } from "@/model";

const bannerList = ref(BANNER_DATA);
const gridList = ref(GRID_DATA);
// tabs
const tabList = ref(TAB_DATA);
const stickyBgColor = ref("#ededed");
const offsetTop = ref("42");
// 商品瀑布流列表
const loadStatus = ref("loadmore");
const flowList = ref([]);
const goodsList = ref(GOODS_DATA);
const waterfallRef = ref();
// 返回顶部
const backTop = ref(0);

onLoad(() => {
  // 初始化动态修改状态栏的颜色
  // #ifdef !APP-PLUS
  uni.setNavigationBarColor({
    frontColor: "#ffffff",
    borderBottomColor: "#fa3534",
    backgroundColor: "#fa3534"
  });
  // #endif
  // #ifdef H5
  offsetTop.value = "0";
  // #endif
  // #ifdef APP-PLUS
  offsetTop.value = (42 + plus.navigator.getStatusbarHeight()).toString();
  // #endif
  addRandomData();
});

// 监听页面滚动(tabs吸顶, 返回顶部)
onPageScroll((e) => {
  backTop.value = e.scrollTop;
  stickyBgColor.value = e.scrollTop > 320 ? "#ffffff" : "";
  // 动态修改状态栏的颜色
  // #ifdef !APP-PLUS
  uni.setNavigationBarColor({
    frontColor: e.scrollTop >= 44 ? "#000000" : "#ffffff",
    borderBottomColor: e.scrollTop >= 44 ? "#ffffff" : "#fa3534",
    backgroundColor: e.scrollTop >= 44 ? "#ffffff" : "#fa3534"
  });
  // #endif
});

// 触底加载
onReachBottom(() => {
  console.log("触底加载");
  if (flowList.value.length > 32) {
    loadStatus.value = "nomore";
    return;
  }
  loadStatus.value = "loading";
  addRandomData();
});
// 下拉刷新
onPullDownRefresh(() => {
  console.log("下拉刷新");
  // 瀑布流数据清空
  if (waterfallRef.value) {
    waterfallRef.value.onClear();
  }
  // 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
  loadStatus.value = "loading";
  flowList.value = [];
  setTimeout(() => {
    addRandomData();
    uni.stopPullDownRefresh();
  }, 300);
});

const addRandomData = () => {
  for (let i = 0; i < 8; i++) {
    let index = random(0, goodsList.value.length - 1);
    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
    let item = JSON.parse(JSON.stringify(goodsList.value[index]));
    item.id = guid(20);
    flowList.value.push(item);
  }
};
</script>

<style lang="scss">
// APP窗口背景色默认白色，需用此种方式调整窗口背景色
page {
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.vmall-home {
  .header {
    background: linear-gradient(to top, #ededed, #ff6666, #fa3534);
    padding: 0rpx 20rpx;
  }
  .content {
    background: #ededed;
  }
}
</style>
