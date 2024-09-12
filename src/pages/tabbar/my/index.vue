<template lang="pug">
view.vmall-my
  view.header-top(v-if="backTop > 44")
    view.search-sticky
      u-navbar(
        title="我的"
        :safeAreaInsetTop="false"
        :autoBack="false")
        template(#left)
          u-avatar(v-if="isAccountInfo" :src="userInfo.userImage" size="24")
          u-avatar(v-else, :src="userInfo.noUserImage" size="24")
        template.setting(#right)
          u-icon(name="setting" size="20" color="#333333" @click="onSettingClick")
  view.header-top
    view.header
      view.user-info(v-if="isAccountInfo")
        view.content
          image.avatar(:src="userInfo.userImage")
          view.account.ml2
            view.username {{ userInfo.username }}
            //- view.phone {{ userInfo.phone }}
        view.setting
          u-icon(name="setting" size="20" color="#333333" @click="onSettingClick")
      view.user-login(v-else)
        u-avatar(:src="userInfo.noUserImage" size="50")
        view.account.ml2
          view.login(@click="onLogin") 注册/登录
  view.wrap
    view.order-grid
      u-cell.order-grid-other(title="订单" value="全部订单" :isLink="true" :clickable="true" @click="toOrder(0)")
      view.grid-content
        u-grid(:col="5" :border="false")
          u-grid-item(v-for="(item, index) in orderGridList" :index="index" :key="index" @click="toOrder(item.index)")
            u-badge(max="99" :value="item.count" :offset="[0,8]" :absolute="true" bgColor="#fa3534")
            image.grid-image(:src="item.image")
            text.grid-text {{ item.name }}
    view.other-grid
      u-scroll-list(indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c")
        view.scroll-list__goods-item(
          v-for="(item, index) in otherGridList"
          :key="index"
          @click="toNextPage(item.name)")
          image.scroll-list__goods-item__image(:src="item.image")
          text.scroll-list__goods-item__text {{ item.name }}
    view.other-grid-two
      u-scroll-list(indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c")
        view.scroll-list__goods-item(
          v-for="(item, index) in otherGridListTwo"
          :key="index"
          @click="toNextPage(item.name)")
          image.scroll-list__goods-item__image(:src="item.image")
          text.scroll-list__goods-item__text {{ item.name }}
    u-divider(text="猜您喜欢")
    Waterfall(ref="waterfallRef" :loadStatus="loadStatus" :flowList.sync="flowList" @addRandomData="addRandomData")
    BackTop(:backTop="backTop")
</template>

<script setup>
import { random, guid } from "uview-plus";
import Waterfall from "@/components/waterfall.vue";
import BackTop from "@/components/backTop.vue";
import { GOODS_DATA, ORDER_GRID_DATA, FEATURE_GRID_DATA, FEATURE_GRID_DATA2 } from "@/model";

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
  // 初始化动态修改状态栏的颜色
  // #ifdef !APP-PLUS
  uni.setNavigationBarColor({
    frontColor: "#ffffff",
    borderBottomColor: "#fcc53a",
    backgroundColor: "#fcc53a"
  });
  // #endif
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
  backTop.value = e.scrollTop;
  // 动态修改状态栏的颜色
  // #ifdef !APP-PLUS
  uni.setNavigationBarColor({
    frontColor: e.scrollTop >= 44 ? "#000000" : "#ffffff",
    borderBottomColor: e.scrollTop >= 44 ? "#ffffff" : "#fcc53a",
    backgroundColor: e.scrollTop >= 44 ? "#ffffff" : "#fcc53a"
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

// 账户设置
const onSettingClick = () => {
  uni.navigateTo({
    url: "/pagesB/setting/index"
  });
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
    ::v-deep .u-navbar--fixed {
      top: var(--status-bar-height);
    }
    /* #endif */
  }
  .header {
    // background-image: $andry-bg-image;
    // background-size: cover;
    background: linear-gradient(to top, #ededed, #ffdd8f, #fcc53a);
    padding: 50rpx 26rpx 100rpx 26rpx;
    /* #ifdef APP-PLUS */
    padding: 90rpx 26rpx 100rpx 26rpx;
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
      color: #5d656b;
    }

    .grid-image {
      width: 100rpx;
      height: 100rpx;
    }

    .grid-text {
      font-size: 24rpx;
      padding-bottom: 28rpx;
    }

    .grid-content {
      padding: 28rpx 28rpx 0rpx 28rpx;
    }

    .other-grid,
    .other-grid-two {
      margin: 16rpx 10rpx;
      padding: 24rpx 28rpx;
      border-radius: 8rpx;
      background: #ffffff;
      color: #5d656b;

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

::v-deep .u-divider {
  margin: 0rpx !important;
  height: 100rpx;
}

::v-deep .u-status-bar {
  display: none !important;
}
</style>
