<template lang="pug">
view.vmall-search(:class="{'popup-show': popupShow}")
  StatusBar
  view.header
    <!-- #ifdef H5 || APP-PLUS -->
    up-icon.arrow-left(name="arrow-left", @click="onGoBack", size="22")
    <!-- #endif -->
    up-search(
      placeholder="护肤品",
      v-model="keyword",
      @custom="onSearch",
      @search="onSearch",
      @clear="onClearSearch")
  view.search-result(
    :class="{'search-sesult-index': popupShow}"
    v-if="isSearchResult")
    up-sticky(
      :offsetTop="offsetTop",
      :bgColor="stickyBgColor")
      SearchTab(ref="searchTabRef", @searchResultChange="searchResultChange")
    Waterfall(ref="waterfallRef" :loadStatus="loadStatus" :flowList.sync="flowList" @addRandomData="addRandomData")
  view.history(v-else)
    up-cell(title="搜索历史", :border="false")
      up-icon(slot="right-icon", name="trash", @click="clearHistory")
    view.content
      view.item(
        v-for="(item,index) in historyList",
        :key="index",
        @click="onSearch(item, 'btn')") {{  formatItem(item) }}
  BackTop(:backTop="backTop")
</template>

<script setup>
import { random, guid } from "uview-plus";
import StatusBar from "@/components/status-bar.vue";
import SearchTab from "./components/tab.vue";
import Waterfall from "@/components/waterfall.vue";
import BackTop from "@/components/back-top.vue";
import { GOODS_DATA } from "@/model";

const keyword = ref("");
const historyList = ref([]);
const isSearchResult = ref(false);
const stickyBgColor = ref("#ffffff");
const popupShow = ref(false);
const offsetTop = ref("0");
// 商品瀑布流列表
const loadStatus = ref("loadmore");
const flowList = ref([]);
const goodsList = ref(GOODS_DATA);
const waterfallRef = ref();
// 返回顶部
const backTop = ref(0);

onLoad(() => {
  // #ifdef H5
  offsetTop.value = "-44";
  // #endif
  // #ifdef APP-PLUS
  offsetTop.value = plus.navigator.getStatusbarHeight().toString();
  // #endif
  uni.getStorage({
    key: "historyList",
    success: (res) => {
      historyList.value = res.data == null ? [] : res.data;
    }
  });
  addRandomData();
});

// 返回上一页
const onGoBack = () => {
  uni.navigateBack({
    delta: 1
  });
};

const searchResultChange = (value) => {
  console.log("筛选", value);
  popupShow.value = !value;
};

// 搜索
const onSearch = (value, type) => {
  keyword.value = value;
  if (!type && value) {
    console.log("history", historyList.value);
    const index = historyList.value.indexOf(value);
    if (index == -1) {
      historyList.value.push(keyword.value);
      uni.setStorage({
        key: "historyList",
        data: historyList.value,
        success: () => {}
      });
    }
  }
  isSearchResult.value = true;
};

// 清除搜索条件
const onClearSearch = () => {
  keyword.value = "";
  isSearchResult.value = false;
};

// 清除搜索历史
const clearHistory = () => {
  historyList.value = [];
  uni.removeStorage({
    key: "historyList",
    success: () => {}
  });
};

// 超过指定长度格式化
const formatItem = (item) => {
  const length = item.length;
  return length > 23 ? item.substr(1, 11) + "..." + item.substr(-11, 11) : item;
};

// 监听页面滚动(tabs吸顶, 返回顶部)
onPageScroll((e) => {
  backTop.value = e.scrollTop;
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
.vmall-search {
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 12rpx 24rpx;
    background: #ffffff;
    z-index: 10090;
    /* #ifdef APP-PLUS */
    margin-top: var(--status-bar-height);
    /* #endif */
    .arrow-left {
      margin-right: 20rpx;
    }
  }

  .search-result {
    position: relative;
  }

  .search-sesult-index {
    z-index: 100100;
  }

  .history {
    .content {
      padding: 0rpx 10rpx 0rpx 30rpx;
    }

    .item {
      display: inline-block;
      margin: 0rpx 20rpx 20rpx 0rpx;
      padding: 12rpx 24rpx;
      background: #ffffff;
      font-size: 26rpx;
      border: 2rpx solid #ededed;
      border-radius: 50rpx;
    }

    .item:active {
      background: #ededed;
    }
  }
}

.popup-show {
  overflow: hidden;
  position: fixed;
}
</style>
