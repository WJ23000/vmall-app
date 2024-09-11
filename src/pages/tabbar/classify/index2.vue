<template lang="pug">
view.vmall-classify
  view.u-wrap
    FixedSearch
    view.u-menu-wrap.mt-88
      scroll-view(
        scroll-y 
        scroll-with-animation 
        class="u-tab-view menu-scroll-view" 
        :scroll-top="scrollTop")
        view.u-tab-item( 
          v-for="(item,index) in tabbar" 
          :key="index"
          :class="[current==index ? 'u-tab-item-active' : '']"
          :data-current="index" 
          @click.stop="swichMenu(index)")
          text.u-line-1 {{ item.name }}
      template(v-for="(item,index) in tabbar" :key="index")
        scroll-view.right-box(scroll-y v-if="current==index")
          view.page-view
            view.class-item
              view.item-title
                text {{ item.name }}
              view.item-container
                view.thumb-box(v-for="(item1, index1) in item.foods" :key="index1")
                  image.item-menu-image(:src="item1.icon" mode="")
                  view.item-menu-name {{ item1.name }}
</template>

<script setup>
import FixedSearch from "@/components/search/fixedSearch.vue";
import { CLASSIFY_DATA } from "@/model";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const tabbar = CLASSIFY_DATA;
const scrollTop = ref(0); //tab标题的滚动条位置
const current = ref(0); // 预设当前项的值
const menuHeight = ref(0); // 左边菜单的高度
const menuItemHeight = ref(0); // 左边菜单item的高度

onLoad(() => {});

// 点击左边的栏目切换
const swichMenu = async (index) => {
  if (index == current.value) return;
  current.value = index;
  // 如果为0，意味着尚未初始化
  if (menuHeight.value == 0 || menuItemHeight.value == 0) {
    await getElRect("menu-scroll-view", 1);
    await getElRect("u-tab-item", 2);
  }
  // 将菜单菜单活动item垂直居中
  scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
};
// 获取一个目标元素的高度
const getElRect = (elClass, dataVal) => {
  new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery().in(instance);
    query
      .select("." + elClass)
      .boundingClientRect((res) => {
        if (!res) {
          setTimeout(() => {
            getElRect(elClass);
          }, 10);
          return;
        }
        switch (dataVal) {
          case 1:
            menuHeight.value = res.height;
            break;
          case 2:
            menuItemHeight.value = res.height;
            break;
        }
      })
      .exec();
  });
};
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
.vmall-classify {
  .u-wrap {
    height: calc(100vh);
    /* #ifdef H5 */
    height: calc(100vh - var(--window-bottom));
    /* #endif */
    display: flex;
    flex-direction: column;
  }

  .u-search-box {
    padding: 18rpx 30rpx;
  }

  .u-menu-wrap {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .u-tab-view {
    width: 200rpx;
    height: 100%;
  }

  .u-tab-item {
    height: 110rpx;
    background: #f6f6f6;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #444;
    font-weight: 400;
    line-height: 1;
  }

  .u-tab-item-active {
    position: relative;
    color: #000;
    font-size: 30rpx;
    font-weight: 600;
    background: #fff;
  }

  .u-tab-item-active::before {
    content: "";
    position: absolute;
    border-left: 4px solid #f56c6c;
    height: 32rpx;
    left: 0;
    top: 39rpx;
  }

  .u-tab-view {
    height: 100%;
  }

  .right-box {
    background-color: rgb(250, 250, 250);
  }

  .page-view {
    padding: 16rpx;
  }

  .class-item {
    margin-bottom: 30rpx;
    background-color: #fff;
    padding: 16rpx;
    border-radius: 8rpx;
  }

  .item-title {
    font-size: 26rpx;
    color: $u-main-color;
    font-weight: bold;
  }

  .item-menu-name {
    font-weight: normal;
    font-size: 24rpx;
    color: $u-main-color;
  }

  .item-container {
    display: flex;
    flex-wrap: wrap;
  }

  .thumb-box {
    width: 33.333333%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20rpx;
  }

  .item-menu-image {
    width: 120rpx;
    height: 120rpx;
  }
}
</style>
