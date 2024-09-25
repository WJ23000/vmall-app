<template lang="pug">
view.vmall-my
  view.header-top
    StatusBar(v-show="isStatusBar")
    view.search-sticky
      u-navbar(
        :safeAreaInsetTop="false"
        :bgColor="navbarColor"
        :autoBack="false")
        template(#left)
          view(v-if="isNavbarShow")
            u-avatar(v-if="isAccountInfo" :src="userInfo.userImage" size="24")
            u-avatar(v-else, :src="userInfo.noUserImage" size="24")
          view(v-else)
        template(#center)
          text.f-28(v-if="isNavbarShow") 我的
        template.setting(#right)
          u-icon(name="setting" size="20" color="#333333" @click="onSettingClick")
  view.header-top
    view.header
      view.user-info(v-if="isAccountInfo")
        view.content
          image.avatar(:src="userInfo.userImage")
          view.account.ml-10
            view.username.bold {{ userInfo.username }}
            view.phone {{ userInfo.phone }}
        //- view.setting
        //-   u-icon(name="setting" size="20" color="#333333" @click="onSettingClick")
      view.user-login(v-else)
        u-avatar(:src="userInfo.noUserImage" size="50")
        view.account.ml-10
          view.login(@click="onLogin") 注册/登录
  view.wrap
    view.order-grid
      u-cell.order-grid-other(title="我的订单" value="全部" :isLink="true" :clickable="true" @click="onOrder(0, 0)")
      view.grid-content
        u-grid(:col="5" :border="false")
          u-grid-item(v-for="(item, index) in orderGridList" :index="index" :key="index" @click="onOrder(item.current, item.type)")
            u-badge.badge(max="99" :value="item.count" :offset="[1,10]" :absolute="true" bgColor="#fa3534")
            image.grid-image(:src="item.image")
            text.grid-text {{ item.name }}
    view.other-grid
      u-scroll-list(indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c")
        view.scroll-list__goods-item(
          v-for="(item, index) in otherGridList"
          :key="index"
          @click="toNextPage(item)")
          image.scroll-list__goods-item__image(:src="item.image")
          text.scroll-list__goods-item__text {{ item.name }}
    view.other-grid-two
      u-scroll-list(indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c")
        view.scroll-list__goods-item(
          v-for="(item, index) in otherGridListTwo"
          :key="index"
          @click="toNextPage(item)")
          image.scroll-list__goods-item__image(:src="item.image")
          text.scroll-list__goods-item__text {{ item.name }}
    u-divider(text="猜您喜欢")
    Waterfall(ref="waterfallRef" :loadStatus="loadStatus" :flowList.sync="flowList" @addRandomData="addRandomData")
    BackTop(:backTop="backTop")
</template>

<script setup>
import { random, guid } from "uview-plus";
import StatusBar from "@/components/status-bar.vue";
import Waterfall from "@/components/waterfall.vue";
import BackTop from "@/components/back-top.vue";
import { GOODS_DATA, ORDER_GRID_DATA, FEATURE_GRID_DATA, FEATURE_GRID_DATA2 } from "@/model";

const isStatusBar = ref(false);
const navbarColor = ref("rgba(0, 0, 0, 0)");
const isNavbarShow = ref(false);
const userInfo = ref({
  userImage: "http://cdn.wjaxx.xyz/mine/user.png",
  noUserImage: "http://cdn.wjaxx.xyz/user-mr.png",
  username: "Baymax",
  phone: "180XXXX9388"
});
const isAccountInfo = ref(false);
const orderGridList = ref(ORDER_GRID_DATA);
const otherGridList = ref(FEATURE_GRID_DATA);
const otherGridListTwo = ref(FEATURE_GRID_DATA2);
// 商品瀑布流列表
const loadStatus = ref("loadmore");
const flowList = ref([]);
const goodsList = ref(GOODS_DATA);
const waterfallRef = ref();
// 返回顶部
const backTop = ref(0);

onLoad(() => {
  // 初始化小程序和APP状态栏的颜色
  uni.setNavigationBarColor({
    frontColor: "#ffffff",
    backgroundColor: "#fcc53a"
  });
  // #ifdef H5 || APP-PLUS
  isAccountInfo.value = true;
  // #endif
  uni.getStorage({
    key: "accountInfo",
    success: (res) => {
      isAccountInfo.value = res.data ? true : false;
    }
  });
  addRandomData();
});

// 监听自定义事件并进行页面刷新操作
onShow(() => {
  uni.$on("refresh", (data) => {
    if (data.refresh) {
      // 刷新操作
      isAccountInfo.value = false;
    }
  });
});

onUnload(() => {
  uni.$off("refresh"); // 需要手动解绑自定义事件
});

// 注册&&登录
const onLogin = () => {
  uni.getProvider({
    service: "oauth",
    success: function (res) {
      console.log(res.provider);
    }
  });
  uni.login({
    success: (res) => {
      // res.code 即为获取到的 code
      console.log("登录", res);
      uni.setStorage({
        key: "accountInfo",
        data: true,
        success: () => {
          isAccountInfo.value = true;
        }
      });
    },
    fail(e) {
      console.log("fail", e);
    },
    complete(e) {
      console.log("complete", e);
    }
  });
};

// 监听页面滚动(返回顶部)
onPageScroll((e) => {
  // 动态修改小程序和APP状态栏的颜色
  uni.setNavigationBarColor({
    frontColor: e.scrollTop > 0 ? "#000000" : "#ffffff",
    backgroundColor: e.scrollTop > 0 ? "#ffffff" : "#fcc53a"
  });
  isStatusBar.value = e.scrollTop > 0;
  navbarColor.value = e.scrollTop == 0 ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)";
  isNavbarShow.value = e.scrollTop > 0;
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

// 账户设置
const onSettingClick = () => {
  uni.navigateTo({
    url: "/pagesB/setting/index"
  });
};

// 我的订单
const onOrder = (current, type) => {
  uni.navigateTo({ url: "/pagesA/order/index?current=" + current + "&type=" + type });
};

// 去往其他模块
const toNextPage = (item) => {
  if (item.url) {
    uni.navigateTo({
      url: item.url
    });
  }
};
</script>

<style>
page {
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.vmall-my {
  .search-sticky {
    /* #ifdef APP-PLUS */
    :deep .u-navbar--fixed {
      top: var(--status-bar-height);
    }
    /* #endif */
  }
  .header {
    // background-image: $andry-bg-image;
    // background-size: cover;
    background: linear-gradient(to top, #ededed, #ffdd8f, #fcc53a);
    // background: #fcc53a;
    padding: 50rpx 26rpx 100rpx 26rpx;
    /* #ifdef APP-PLUS */
    padding: calc(var(--status-bar-height) + 50rpx) 26rpx 100rpx 26rpx;
    /* #endif */
    display: flex;
    .user-info {
      display: flex;
      flex: 1;
      justify-content: space-between;
      .content {
        display: flex;
      }
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
      }
    }
    .user-login {
      display: flex;
    }

    .account {
      display: flex;
      flex-direction: column;
      margin-left: 24rpx;
      height: 100rpx;
      justify-content: center;
    }

    .account > .username {
      font-size: 36rpx;
    }

    .account > .phone {
      margin-top: 8rpx;
      font-size: 28rpx;
    }

    .account > .login {
      font-size: 32rpx;
    }
  }

  .wrap {
    margin-top: -84rpx;
    padding: 20rpx 10rpx;

    .order-grid {
      margin: 16rpx 10rpx;
      border-radius: 8rpx;
      background: #ffffff;
      color: #666666;
    }

    .grid-image {
      width: 88rpx;
      height: 88rpx;
    }

    .grid-text {
      font-size: 24rpx;
      padding-bottom: 28rpx;
    }

    .grid-content {
      padding: 28rpx 28rpx 0rpx 28rpx;
      .badge {
        z-index: 100;
      }
    }

    .other-grid,
    .other-grid-two {
      margin: 16rpx 10rpx;
      padding: 24rpx 28rpx;
      border-radius: 8rpx;
      background: #ffffff;
      color: #666666;

      .scroll-list__goods-item__image {
        display: block;
        margin: 0 auto;
      }
    }

    .other-grid-two {
      margin: 16rpx 10rpx 0rpx 10rpx;
    }

    .scroll-list {
      @include flex(column);

      &__goods-item {
        margin-right: 20rpx;
        text-align: center;

        &__image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 8rpx;
        }

        &__text {
          display: inline-block;
          text-align: center;
          font-size: 24rpx;
          margin-top: 10rpx;
          width: 120rpx;
        }
      }
    }

    .u-scroll-list {
      padding-bottom: 0rpx;
    }
  }
}

.setting {
  display: flex;
  align-items: flex-start;
  margin-top: 6rpx;
}
.chat {
  position: relative;
  margin-left: 16rpx;
  margin-right: 8rpx;
}

:deep(.u-status-bar) {
  display: none !important;
}
</style>
