<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-27 10:26:33
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.order-list.flex.column
  view.header.px-24.pt-16
    view.flex.justify-between.py-20
      u-search(placeholder="输入商品名称、订单编号搜索" v-model="keyword" :show-action="false" @clear="onClearSearch" clearabled)
      view.search-btn.tc.ml-16.f-28(@click="onSearch") 搜索
    u-tabs(
      :list="tabList"
      :current="current"
      lineColor="#fa3534"
      lineWidth="30"
      :itemStyle="itemStyle"
      :activeStyle="activeStyle"
      :inactiveStyle="inactiveStyle"
      :keyName="name"
      @click="onTabChange")
  view.container.flex1(v-if="orderList.length > 0")
    view(v-for="(item, index) in orderList" :key="index")
      OrderCard(:item="item" :type="current" @delete="onDeleteOrder" @detail="onOrderDetail")
  //- 暂无数据
  view(v-else)
    Empty(:emptyInfo="emptyInfo")
</template>

<script setup>
import OrderCard from "@/components/order/card.vue";
import Empty from "@/components/empty.vue";
import { ORDER_GOODS_DATA } from "@/model";
const EmptyImage = ref("http://cdn.wjaxx.xyz/empty/empty.png");

const keyword = ref("");
const current = ref(0);
const itemStyle = ref({
  height: "40px"
});
const activeStyle = ref({
  fontWeight: "bold",
  fontSize: "14px",
  color: "#000000"
});
const inactiveStyle = ref({
  fontSize: "14px",
  color: "#000000"
});

const tabList = ref([
  {
    name: "全部",
    type: 0
  },
  {
    name: "待付款",
    type: 10
  },
  {
    name: "待发货",
    type: 20
  },
  {
    name: "待收货",
    type: 30
  },
  {
    name: "已完成",
    type: 50
  },
  {
    name: "已取消",
    type: 51
  }
]);
const orderList = ref([]);
const pageParam = ref({
  status: "",
  page: 1,
  page_size: 10
});
const total = ref();
const emptyInfo = ref({
  image: EmptyImage,
  width: 300,
  height: 300,
  tip: "暂无数据"
});

onLoad((options) => {
  current.value = Number(options.current);
  pageParam.value.status = options.type;
});

onShow(() => {
  // initList();
  orderList.value = JSON.parse(JSON.stringify(ORDER_GOODS_DATA));
});

// 初始化请求数据
const initList = () => {
  pageParam.value.page = 1;
  orderList.value = [];
  getOrderList();
};

// 获取订单列表
const getOrderList = () => {
  orderApi
    .orderList({
      status: pageParam.value.status,
      keyword: keyword.value,
      page: pageParam.value.page,
      page_size: pageParam.value.page_size
    })
    .then((res) => {
      total.value = res.data.total;
      let list = res.data.data;
      if (list.length > 0) {
        orderList.value = orderList.value.concat(list);
      }
    });
};

// 搜索
const onSearch = () => {
  initList();
};
const onClearSearch = () => {
  keyword.value = "";
  initList();
};

// 触底加载
onReachBottom(() => {
  if (orderList.value.length < total.value) {
    pageParam.value.page++;
    getOrderList();
  }
});

// 切换tab
const onTabChange = (e) => {
  // current.value = e.index;
  // pageParam.value.status = e.type;
  // initList();
};

// 删除订单
const onDeleteOrder = (id) => {
  orderApi.deleteOrder({ id }).then((res) => {
    if (res.code == 1) {
      uni.showToast({
        title: "订单已删除",
        icon: "success",
        mask: true
      });
      initList();
    }
  });
};

// 订单详情
const onOrderDetail = (id) => {
  uni.navigateTo({ url: "/pagesA/order/detail?id=" + id });
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
</style>
<style lang="stylus" scoped>
.order-list
  height: 100vh;
  .header
    background: #ffffff;
    height: 208rpx;
    .search-btn
      width: 104rpx;
      height: 64rpx;
      line-height: 64rpx;
      background: #fa3534;
      color: #ffffff;
      border-radius: 16rpx;
  .container
    overflow: auto;
    .item
      border-bottom: 2rpx solid #EEEEEE;
      .avatar
        width: 96rpx;
        height: 96rpx;
  .divider
    width: 440rpx;
    margin: 0 auto;
</style>
