<template lang="pug">
view.vmall-order-list.flex.column
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
    swiper.h100
      swiper-item
        scroll-view.h100(
          scroll-y
          :enhanced="true"
          :show-scrollbar="false"
          @touchstart="touchStart"
          @touchend="touchEnd($event)")
          view(v-for="(item, index) in orderList" :key="index")
            OrderCard(
              :item="item" 
              :type="current" 
              @delete="onDeleteOrder" 
              @logistics="onOrderLogistics"
              @detail="onOrderDetail"
              @pay="onOrderPay")
  //- 暂无数据
  swiper.h100(v-else)
    swiper-item
      scroll-view.h100(
        scroll-y
        :enhanced="true"
        :show-scrollbar="false"
        @touchstart="touchStart"
        @touchend="touchEnd($event)")
        view.empty-container.flex.justify-center.items-center
          Empty(:emptyInfo="emptyInfo")
</template>

<script setup>
import OrderCard from "../components/order/card.vue";
import Empty from "@/components/empty.vue";
import { ORDER_GOODS_DATA } from "@/model";
const EmptyImage = ref("http://cdn.wjaxx.xyz/empty/normal.png");

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
    name: "退款/售后",
    type: 50
  },
  {
    name: "待评价",
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
const startX = ref();

onLoad((options) => {
  current.value = Number(options.current);
  pageParam.value.status = options.type;
});

onShow(() => {
  // initList();
  orderListMock(pageParam.value.status);
});

// 数据mock
const orderListMock = (type) => {
  orderList.value = JSON.parse(JSON.stringify(ORDER_GOODS_DATA));
  switch (Number(type)) {
    case 10:
      orderList.value = orderList.value.filter((item) => item.status == 10);
      console.log("触发了不", orderList.value);
      break;
    case 20:
      orderList.value = orderList.value.filter((item) => item.status == 20);
      console.log("触发了不", orderList.value);
      break;
    case 30:
      orderList.value = orderList.value.filter((item) => item.status == 30);
      break;
    case 50:
      orderList.value = orderList.value.filter((item) => item.status == 50);
      break;
    case 51:
      orderList.value = orderList.value.filter((item) => item.status == 51);
      break;
    default:
      orderList.value = JSON.parse(JSON.stringify(ORDER_GOODS_DATA));
      break;
  }
};

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
  current.value = e.index;
  // pageParam.value.status = e.type;
  // initList();
  console.log("e.type", e.type);
  orderListMock(e.type);
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

// 查看物流
const onOrderLogistics = (id) => {
  uni.navigateTo({ url: "/pagesA/order/logistics?id=" + id });
};

// 订单详情
const onOrderDetail = (id) => {
  uni.navigateTo({ url: "/pagesA/order/detail?id=" + id });
};

// 订单支付
const onOrderPay = (id) => {
  uni.navigateTo({ url: "/pagesA/order/confirm" });
};

const touchStart = (e) => {
  startX.value = e.changedTouches[0].pageX; // 触摸目标在页面中的X坐标
  console.log("开始触摸", startX.value);
};
const touchEnd = (e, index) => {
  // 手指离开屏幕时触发，获取滑动距离
  const moveX = e.changedTouches[0].pageX - startX.value;
  // 判断滑动方向
  if (moveX < -60) {
    if (current.value == 5) return;
    current.value++;
    orderListMock(tabList.value[current.value].type);
    console.log("下一题");
  } else if (moveX > 60) {
    if (current.value == 0) return;
    current.value--;
    orderListMock(tabList.value[current.value].type);
    console.log("上一题");
  }
};
</script>

<style lang="scss">
page {
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.vmall-order-list {
  height: 100vh;
  .header {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    height: 208rpx;
    z-index: 1000;
    .search-btn {
      width: 104rpx;
      height: 64rpx;
      line-height: 64rpx;
      background: #fa3534;
      color: #ffffff;
      border-radius: 16rpx;
    }
  }
  .container {
    overflow: auto;
    margin-top: 208rpx;
    .item {
      border-bottom: 2rpx solid #eeeeee;
      .avatar {
        width: 96rpx;
        height: 96rpx;
      }
    }
  }
  .touch {
    height: 100vh;
  }
  .empty-container {
    margin-top: 208rpx;
    background: #ffffff;
    height: calc(100vh - 208rpx);
  }
  .divider {
    width: 440rpx;
    margin: 0 auto;
  }
}
</style>
