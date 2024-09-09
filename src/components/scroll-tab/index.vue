<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-19 17:33:00
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.scroll-tab
  view.menu-tab.flex.items-center.bg-white.h-104
    scroll-view(
      scroll-x
      :enhanced="true"
      :show-scrollbar="false"
      class="scroll-content")
      view.content-list
        view.item(
          v-for="(item, index) in menuList",
          :key="index",
          :class="form.id == item.id ? 'content-active' : ''",
          @click="onMenuItem(item)") {{ item.name }}
  view.tab.justify-center(v-if="form.name == '求购'")
    view.item(
      v-for="(item, index) in tabList",
      :key="index",
      @click="onTabItem(item.name, index)")
      view
        text(:class="item.sort ? 'blue' : ''",) {{ item.name }}
        text(:class="item.sort ? 'arrow-up .up-active' : 'arrow-down'")
  //- 遮罩层
  u-overlay(:show="maskShow", :z-index="10", opacity="0" @click="onMaskClose")
  //- 面板
  view.mask-content(v-if="maskShow", @tap.stop)
    //- 求购
    view.cell.flex.justify-center.h-88(
      v-for="(pitem, pindex) in buyTypeList",
      :key="pindex",
      :class="buyType == pitem.id ? 'blue' : ''",
      @click="onBuyTypeItem(pitem.id)")
      text.f-28.bold {{ pitem.name }}
</template>

<script setup>
const emit = defineEmits(["scrollShow", "paramData"]);
// 菜单
const menuList = ref([
  {
    id: 1,
    name: "全部"
  },
  {
    id: 2,
    name: "求购"
  },
  {
    id: 3,
    name: "问界"
  },
  {
    id: 4,
    name: "广汽"
  },
  {
    id: 5,
    name: "荣威"
  },
  {
    id: 6,
    name: "吉利"
  },
  {
    id: 7,
    name: "奇瑞"
  },
  {
    id: 8,
    name: "宝马"
  }
]);
const form = ref({
  id: 1,
  name: ""
});
// 求购
const tabList = ref([
  {
    name: "选择品牌车型",
    sort: false
  }
]);
const tabActive = ref();
const maskShow = ref(false);
const buyTypeList = ref([
  {
    id: 1,
    name: "路虎 1600S"
  },
  {
    id: 2,
    name: "玛莎拉蒂 200X"
  },
  {
    id: 3,
    name: "布嘉迪 275S"
  },
  {
    id: 4,
    name: "莲花 1996"
  }
]);
const buyType = ref();

// 菜单操作
const onMenuItem = (item) => {
  form.value = item;
  emit("paramData", form.value);
  initStatus();
};

const onTabItem = (name, index) => {
  tabActive.value = name;
  tabList.value.forEach((item) => {
    if (item.name == name) {
      item.sort = !item.sort;
      if (item.sort) {
        maskShow.value = true;
        emit("scrollShow", true);
      } else {
        maskShow.value = !maskShow.value;
        emit("scrollShow", maskShow.value);
      }
    } else {
      item.sort = false;
    }
  });
};

// 关闭遮罩层
const onMaskClose = () => {
  initStatus();
};

// 面板操作
const onBuyTypeItem = (id) => {
  buyType.value = id;
  emit("paramData", buyType.value);
  initStatus();
};

// 状态初始化
const initStatus = () => {
  maskShow.value = false;
  tabList.value.forEach((item) => {
    item.sort = false;
  });
  emit("scrollShow", false);
};
</script>

<style lang="stylus" scoped>
.scroll-tab
  position: fixed;
  /* #ifdef MP-WEIXIN */
  top: 0;
  /* #endif */
  /* #ifdef H5 */
  top: 88rpx;
  /* #endif */
  width: 100%;
  z-index: 100;
  .tab
    position: relative;
    display: flex;
    height: 72rpx;
    line-height: 72rpx;
    background: #ECECEC;
    z-index: 10060;
    .item
      width: 25%;
      text-align: center;
      font-size: 26rpx;
      color: #888888;
  .mask-content
    position: absolute;
    width: 100%;
    background: #ffffff;
    z-index: 10060;
    box-sizing: border-box;
    border-radius: 0rpx 0rpx 32rpx 32rpx;
  .cell
    color: #888888;
    font-size: 26rpx;
    border-bottom: 2rpx solid #f5f5f5;
  .cell:last-child
    border-bottom: 0rpx;
  .arrow-down
    position: relative;
    top: 22rpx;
    left: 16rpx;
    width: 0rpx;
    height: 0rpx;
    border: 8rpx solid transparent;
    border-top-color: #000000;
  .down-active
    border-top-color: #0263F2;
  .arrow-up
    position: relative;
    top: -20rpx;
    left: 16rpx;
    width: 0rpx;
    height: 0rpx;
    border: 8rpx solid transparent;
    border-bottom-color: #000000;
  .up-active
    border-bottom-color: #0263F2;
  .scroll-content
    white-space: nowrap;
  .content-list
    .item
      display: inline-block;
      margin-right: 20rpx;
      height: 56rpx;
      line-height: 56rpx;
      padding: 0rpx 32rpx;
      background: #ECECEC;
      border: 2rpx solid #ECECEC;
      font-size: 28rpx;
      border-radius: 50rpx;
      text-align: center;
    .item:first-child
      margin-left: 32rpx;
    .item:last-child
      margin-right: 32rpx;
  .content-active
    background: #0263F2 !important;
    color: #ffffff;
    border: 2rpx solid  #0263F2 !important;
</style>
