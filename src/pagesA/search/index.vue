<template lang="pug">
view.vmall-search(:class="{'popup-show': popupShow}")
	status-bar
	view.header
		<!-- #ifdef H5 || APP-PLUS -->
		u-icon.arrow-left(name="arrow-left", @click="onGoBack", size="22")
		<!-- #endif -->
		u-search(
			placeholder="护肤品",
			v-model="keyword",
			@custom="onSearch",
			@search="onSearch",
			@clear="onClearSearch")
	view.search-result(
		:class="{'search-sesult-index': popupShow}"
		v-if="isSearchResult")
		u-sticky(
			:offsetTop="offsetTop",
			:bgColor="stickyBgColor")
			SearchTab(ref="searchTabRef", @searchResultChange="searchResultChange")
		SearchResult
	view.history(v-else)
		u-cell(title="搜索历史", :border="false")
			u-icon(slot="right-icon", name="trash", @click="clearHistory")
		view.content
			view.item(
				v-for="(item,index) in historyList",
				:key="index",
				@click="onSearch(item, 'btn')") {{  formatItem(item) }}
</template>

<script setup>
import SearchTab from "./components/tab.vue";
import SearchResult from "./components/result.vue";

const keyword = ref("");
const historyList = ref([]);
const isSearchResult = ref(false);
const stickyBgColor = ref("#ffffff");
const popupShow = ref(false);
const offsetTop = ref("0");

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
</script>

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
      padding: 6rpx 24rpx;
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
