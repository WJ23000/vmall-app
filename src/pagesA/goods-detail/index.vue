<template lang="pug">
//- 控制页面滑动
page-meta(:page-style="'overflow:' + (scrollShow ? 'hidden' : 'visible')")
view.andry-goods-detail
  StatusBar(v-show="isStatusBar")
  view.header(:style="{background: bgColor}")
    view.left-option
      <!-- #ifdef H5 || APP-PLUS -->
      view.left-image(:class="{resetImage: backTop < 44}")
        image(:src="backTop > 44 ? returnImage : returnImageWhite" @click="onGoBack")
      <!-- #endif -->
      up-tabs(
        v-if="backTop > 44"
        :list="tabList"
        :current="current"
        lineWidth="20"
        lineHeight="7"
        :lineColor="`url(${lineBg}) 100% 100%`"
        :activeStyle="activeStyle"
        :inactiveStyle="inactiveStyle"
        :itemStyle="itemStyle"
        @click="onTab")
    view.right-option
      view.right-image(:class="{resetImage: backTop < 44}" @click="onCollect")
        image(v-if="!isCollect" :src="backTop > 44 ? starImage : starImageWhite")
        up-icon(v-else name="star-fill" size="22" color="#fa3534")
      view.right-image(:class="{resetImage: backTop < 44}" @click="onCreatePoster")
        image(:src="backTop > 44 ? shareImage : shareImageWhite")
  Banner(id="goods" :bannerList="bannerList")
  view.money-cell
    view.money
      text.unit 预估到手
      text.unit ￥
      text.price 2580
      text.decimal .00
  view.cell(:style="{marginTop: '-25px'}")
    view.title
      text.type 自营
      text.sub-title SK-II神仙水160ml精华液双支装sk2护肤品skii化妆品礼盒520情人节礼物
    view.tag 美白 · 提亮肤色 · 白到自发光
    view.rank
      text.type
        text 排行榜
      view.sub-title
        view 精华热卖榜 · 第5名
        up-icon(name="arrow-right" size="14" color="#fa3534" :bold="true")
    view.info
      view.item(@click="onCreatePoster")
        up-icon(name="share-square" size="22")
        text.item-title 分享
      view.item(@click="onCollect")
        up-icon(v-if="!isCollect" name="star" size="22")
        up-icon(v-else name="star-fill" size="22" color="#fa3534")
        text.item-title 收藏
      view.item
        up-icon(name="rmb-circle" size="22")
        text.item-title 降价通知
  view.cell
    view.cell-option(@click="onCartShow")
      view.checked
        text.option-title 选择
        view.detail
          text.txt 神仙水精华230ml，1.3kg，1件
          up-icon(name="arrow-right" size="14" :bold="true")
    view.cell-option
      view.address
        text.option-title 送至
        view.detail
          up-icon(name="map" size="14" color="#fa3534" :bold="true")
          text.txt 浙江省杭州市西湖区留下街道石马社区91号楼
          up-icon(name="arrow-right" size="14" :bold="true")
    view.cell-option
      view.service
        text.option-title 服务
        view.service-detail
          view 破损包退 · 极速退款 · 7天无理由退换
          up-icon(name="arrow-right" size="14" color="#fa3534" :bold="true")
  <!-- 暗锚点 -->
  view.dark_anchor(id="evaluate")
  view.cell
    view.cell-header
      view.cell-header-title 评价(8万+)
      view.cell-header-other
        text 好评率 90%
        up-icon(name="arrow-right" size="14" :bold="true")
    view.evaluate-cell(v-for="(item, index) in evaluateList" :key="index")
      view.left.mr-20
        view.user
          image(:src="item.userImage")
          view
            text {{ item.userName }}
            up-rate(count="5" size="14" v-model="item.rate")
        view.comment {{ item.evaluate }}
      view.right
        image(v-for="(record, index) in item.imgList" :src="record" :key="index")
  <!-- 暗锚点 -->
  view.dark_anchor(id="recommend")
  view.cell
    view.cell-header
      view.cell-header-sub-title
        view.cell-header-line
        view 为你推荐
      view.cell-header-other
        text 查看全部
        up-icon(name="arrow-right" size="14" :bold="true")
    view.recommend-cell
      Recommend(:recommendList="recommendList")
  <!-- 暗锚点 -->
  view.dark_anchor(id="detail")
  view.detail-cell
    view.cell-header
      view.cell-header-sub-title
        view.cell-header-line
        view 详情
    Introduce(:introduceList="introduceList")
  view.bottom
    view.bottom-option(@click="onGoBack")
      view.item
        image(src="http://cdn.wjaxx.xyz/tabbar/home-black.png")
        text 首页
    view.bottom-option(@click="openConversationList")
      view.item
        image(src="http://cdn.wjaxx.xyz/kefu.png")
        text 客服
    view.bottom-option(@click="onCartPage")
      view.item
        image(src="http://cdn.wjaxx.xyz/tabbar/cart-black.png")
        text 购物车
    view.button
      view.left(@click="onCartShow") 加入购物车
      view.right(@click="onPayShow") 立即购买
  Check(
    v-if="shopCheckShow"
    :specifList="specifList"
    :specType="specType"
    @close="shopCheckShow=false"
    @cart="onCartGoods"
    @pay="onPayGoods")
  //- 海报
  up-overlay(:show="overlayShow" @click="onOverlayShow")
    view.poster-container.flex.column.justify-center.items-center.px-72
      canvas(canvas-id="myCanvas" :style="{ width: '304px', height: '412px' }")
      view.flex.column.justify-center.items-center.mt-28
        view.save-btn.tc.f-32-B(@click="savePoster") 保存海报至相册
  BackTop(:backTop="backTop")
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { IMG_URL } from "@/config";
import StatusBar from "@/components/status-bar.vue";
import Banner from "./components/banner.vue";
import Recommend from "./components/recommend.vue";
import Introduce from "./components/introduce.vue";
import Check from "./components/check.vue";
import BackTop from "@/components/back-top.vue";
import { GOODS_BANNER_DATA, GOODS_DATA } from "@/model";
import { getPosterFilePath, removePosterFilePath } from "@/service";
import downloadPicture from "@/utils/downloadPicture";
import { base64ToPath } from "@/utils/base64srcLocal";
import { createPoster, clearPoster } from "@/utils/poster";
import Shop from "@/static/shop.png";
import Cover from "@/static/img.jpg";
import QrCode from "@/static/qrcode.jpg";

const returnImage = ref(IMG_URL + "/return.png");
const returnImageWhite = ref(IMG_URL + "/return-white.png");
const starImage = ref(IMG_URL + "/star.png");
const starImageWhite = ref(IMG_URL + "/star-white.png");
const shareImage = ref(IMG_URL + "/share.png");
const shareImageWhite = ref(IMG_URL + "/share-white.png");
const instance = getCurrentInstance();
const isStatusBar = ref(false);
const bannerList = ref(GOODS_BANNER_DATA);
const recommendList = ref(GOODS_DATA);
const bgColor = ref("rgba(0, 0, 0, 0)");
const tabList = ref([
  {
    id: "goods",
    name: "商品"
  },
  {
    id: "evaluate",
    name: "评价"
  },
  {
    id: "recommend",
    name: "推荐"
  },
  {
    id: "detail",
    name: "详情"
  }
]);
const scrollHeight = ref({
  evaluateHeight: "",
  recommendHeight: "",
  detailHeight: ""
});
const lineBg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";
const activeStyle = ref({
  color: "#303133",
  fontWeight: "bold",
  transform: "scale(1.05)"
});
const inactiveStyle = ref({
  color: "#606266",
  transform: "scale(1)"
});
const itemStyle = ref({
  paddingLeft: "15px",
  paddingRight: "15px",
  height: "34px"
});
const current = ref(0);
const evaluateList = ref([
  {
    userName: "wj23000",
    userImage: IMG_URL + "/mine/user.png",
    evaluate: "皮肤吸收特别快，不会出现粘腻的感觉，给人非常舒适的感觉，这一年皮肤越来越好，自然健康越来越自信",
    rate: 4,
    imgList: [IMG_URL + "/goods/img.jpg"]
  }
]);
const introduceList = ref([
  {
    type: "video",
    url: '<video src="http://cdn.wjaxx.xyz/goods/detail.mp4" controlslist="nodownload"/>'
  },
  {
    type: "image",
    url: '<img src="http://cdn.wjaxx.xyz/goods/detail2.jpg"/>'
  }
]);
const isCollect = ref(false);
// 规格
const specifList = ref([
  {
    id: 1,
    name: "自营",
    price: 1540.5,
    specif: "自营",
    quantity: 1,
    sell: 101,
    image: IMG_URL + "/goods/img.jpg",
    stock: 80,
    checked: false
  },
  {
    id: 2,
    name: "旗舰店",
    price: 1590.5,
    specif: "旗舰店",
    quantity: 2,
    sell: 102,
    image: IMG_URL + "/goods/img2.jpg",
    stock: 100,
    checked: false
  }
]);
const shopCheckShow = ref(false);
const specType = ref(1);
// 海报
const overlayShow = ref(false);
const posterInfo = ref({
  cover: Cover,
  storeLogo: Shop,
  storeName: "大黑店铺",
  shopName: "SK-II神仙水160ml精华液双支装sk2护肤品skii化妆品礼盒520情人节礼物",
  price: "2580.00",
  qrCode: QrCode
});
const scrollShow = ref(false);
// 返回顶部
const backTop = ref(0);

onLoad((option) => {
  // 富文本内容格式化
  introduceList.value[0].url = matchRichHtml(introduceList.value[0].url);
  // 初始化小程序和APP状态栏的颜色
  uni.setNavigationBarColor({
    frontColor: "#000000",
    backgroundColor: "#ffffff"
  });
});

onMounted(() => {
  initScrollHeight();
  console.log("元素高度", scrollHeight.value);
});

// 监听页面滚动(一键置顶，tabs吸顶)
onPageScroll((e) => {
  console.log("距离", e.scrollTop);
  backTop.value = e.scrollTop;
  isStatusBar.value = e.scrollTop > 0;
  bgColor.value = e.scrollTop == 0 ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)";
  let top = Math.floor(e.scrollTop);
  if (top >= 0 && top < scrollHeight.value.evaluateHeight) {
    if (current.value != 0) current.value = 0;
  } else if (top >= scrollHeight.value.evaluateHeight && top < scrollHeight.value.recommendHeight) {
    if (current.value != 1) current.value = 1;
  } else if (top >= scrollHeight.value.recommendHeight && top < scrollHeight.value.detailHeight) {
    if (current.value != 2) current.value = 2;
  } else {
    if (current.value != 3) current.value = 3;
  }
});

const initScrollHeight = () => {
  getElementInfoById("evaluate").then((res) => {
    scrollHeight.value.evaluateHeight = Math.floor(res.top);
  });
  getElementInfoById("recommend").then((res) => {
    scrollHeight.value.recommendHeight = Math.floor(res.top);
  });
  getElementInfoById("detail").then((res) => {
    scrollHeight.value.detailHeight = Math.floor(res.top);
  });
};

// 获取当前元素距离顶部的距离
const getElementInfoById = (elementId) => {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .select("#" + elementId)
      .boundingClientRect((data) => {
        resolve(data);
      })
      .exec();
  });
};

// 返回上一页
const onGoBack = () => {
  uni.navigateBack({
    delta: 1
  });
};

// 加入购物车-显示规格列表
const onCartShow = () => {
  specType.value = 1;
  shopCheckShow.value = true;
};

// 立即购买-显示规格列表
const onPayShow = () => {
  specType.value = 2;
  shopCheckShow.value = true;
};

// 打开会话列表
const openConversationList = () => {
  // 1v1 chat: conversationID = `C2C${userID}`
  let conversationID = `C2Ca002`;
  // group chat: conversationID = `GROUP${groupID}`
  // let conversationID = `GROUP@TGS#146FYPGPO`;
  uni.navigateTo({
    url: `/TUIKit/components/TUIChat/index?conversationID=${conversationID}`
  });

  // 打开会话列表
  // uni.navigateTo({ url: "/TUIKit/components/TUIConversation/index" });

  // 打开联系人
  // uni.navigateTo({ url: "/TUIKit/components/TUIContact/index" });
};

// 跳到购物车
const onCartPage = () => {
  uni.switchTab({
    url: "/pages/tabbar/cart/index"
  });
};

// 加入购物车
const onCartGoods = (id) => {
  shopCheckShow.value = false;
  uni.showToast({
    title: "已加入到购物车",
    icon: "success",
    mask: true
  });
  // addCart(id);
};
const addCart = (id) => {
  shopApi
    .addCart({
      goods_spec_id: id,
      promotion: shop.value.promotion
    })
    .then(() => {
      uni.showToast({
        title: "已加入到购物车",
        icon: "success",
        mask: true
      });
    });
};
// 立即购买
const onPayGoods = (spec) => {
  shopCheckShow.value = false;
  uni.navigateTo({
    url: "/pagesA/order/confirm?spec=" + JSON.stringify(spec) + "&type=goods"
  });
  // spec.store_name = posterInfo.value.storeName;
  // spec.shop_name = shop.value.name;
  // uni.navigateTo({
  //   url: "/pagesA/order/confirm?spec=" + JSON.stringify(spec) + "&type=goods"
  // });
};

// 收藏/取消收藏
const onCollect = () => {
  isCollect.value = !isCollect.value;
};

// tab切换和锚点定位
const onTab = (item, index) => {
  current.value = index;
  const query = uni.createSelectorQuery(instance);
  query
    .select("#" + item.id)
    .boundingClientRect((data) => {
      console.log(data, "data");
      if (data) {
        uni.pageScrollTo({
          scrollTop: data.top + (backTop.value || 0), // pageScrollTop为页面当前已滚动的距离
          duration: 300 //过渡时间
        });
      }
    })
    .exec();
};

// 生成海报
const onCreatePoster = async () => {
  posterInfo.value.shopName = posterInfo.value.shopName.substring(0, 15) + "…";
  // 清空海报本地图片和canvas画布
  removePosterFilePath();
  clearPoster();
  uni.showLoading({
    title: "海报绘制中…",
    mask: true
  });
  overlayShow.value = true;
  scrollShow.value = true;
  // await goodsImageLocal(posterInfo.value.cover);
  // await createGoodsShare(posterInfo.value.qrCode);
  createPoster(posterInfo.value);
};

// 商品图片转本地图片
const goodsImageLocal = (goods_image) => {
  // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
  uni.getImageInfo({
    src: goods_image,
    success: function (image) {
      posterInfo.value.cover = image.path;
    }
  });
};

// 小程序码
const createGoodsShare = (qrCode_image) => {
  // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
  uni.getImageInfo({
    src: qrCode_image,
    success: function (image) {
      posterInfo.value.qrCode = image.path;
    }
  });
};

// 小程序码
// const createGoodsShare = (id, promotion) => {
//   shopApi
//     .createGoodsShare({
//       id,
//       promotion
//     })
//     .then((res) => {
//       const scene = "&id=" + res.data.share_id + "&code=" + userInfo.value.invitation_code;
//       shopApi
//         .createGoodsQrcode({
//           scene
//         })
//         .then((res) => {
//           base64ToPath(res.data)
//             .then((path) => {
//               posterInfo.value.qrCode = path; // 二维码
//               if (posterInfo.value.cover && posterInfo.value.qrCode) {
//                 createPoster(posterInfo.value);
//               }
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         });
//     });
// };

// 保存海报图片
const savePoster = () => {
  let filePath = getPosterFilePath();
  downloadPicture(filePath);
};

// 关闭海报遮罩层
const onOverlayShow = () => {
  overlayShow.value = false;
  scrollShow.value = false;
};

const decimal = (value, type) => {
  return value.split(".")[type];
};

// 富文本内容格式化
const matchRichHtml = (data) => {
  var htmlContent = data.replace(/<video/g, '<video style="width: 100%"');
  return htmlContent;
};
</script>

<style lang="scss">
// APP窗口背景色默认白色，需用此种方式调整窗口背景色
page {
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.andry-goods-detail {
  .header {
    position: fixed;
    top: 0;
    /* #ifdef APP-PLUS */
    top: var(--status-bar-height);
    /* #endif */
    z-index: 999;
    width: 100%;
    height: 44px;
    padding: 0rpx 12rpx 0rpx 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .left-option,
    .right-option {
      display: flex;
      align-items: center;
      .left-image {
        margin-right: 12rpx;
        width: 44rpx;
        height: 44rpx;
        padding: 8rpx;
      }
      .right-image {
        margin-right: 12rpx;
        padding: 8rpx;
      }
      image {
        width: 44rpx;
        height: 44rpx;
      }
    }
    .resetImage {
      display: flex;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
  }
  .dark_anchor {
    height: 44px;
    margin-top: -44px;
  }
  .tabs {
    display: flex;
    justify-content: start;
    .item {
      margin-right: 20rpx;
    }
  }
  .active {
    color: #fa3534;
  }
  // background-color: #f2f2f2;
  .cell {
    background: #ffffff;
    padding: 20rpx 28rpx;
    margin: 20rpx;
    border-radius: 16rpx;
  }
  .detail-cell {
    background: #ffffff;
    padding: 20rpx 28rpx;
    border-radius: 16rpx;
  }

  .tag {
    margin-top: 20rpx;
    font-size: 26rpx;
    color: #999999;
  }

  .money-cell {
    background: #fa3534;
    padding: 20rpx 28rpx 20rpx 38rpx;
    margin: 20rpx;
    border-radius: 16rpx;
  }

  .money {
    padding-bottom: 40rpx;
    color: #ffffff;
  }

  .price {
    font-size: 48rpx;
    font-weight: bold;
  }

  .unit,
  .decimal {
    font-size: 28rpx;
  }

  .title {
    margin-top: 20rpx;
    font-weight: bold;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    .type {
      background: #fa3534;
      color: #ffffff;
      font-size: 26rpx;
      padding: 4rpx 12rpx;
      margin-right: 8rpx;
      border-radius: 8rpx;
    }
    .sub-title {
      font-size: 36rpx;
    }
  }

  .rank {
    margin-top: 20rpx;
    display: flex;
    align-items: center;
    .type {
      background: #fa3534;
      color: #ffffff;
      font-size: 26rpx;
      padding: 4rpx 12rpx;
      margin-right: 8rpx;
      border-radius: 8rpx;
    }
    .sub-title {
      margin-left: 20rpx;
      display: flex;
      justify-content: space-between;
      flex: 1;
      font-size: 26rpx;
      color: #fa3534;
    }
  }

  .rank-image {
    width: 28rpx;
    height: 28rpx;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
    .item {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      &-title {
        margin-left: 8rpx;
        color: #999999;
      }
    }
  }
  .cell-option {
    margin-top: 20rpx;
    font-size: 28rpx;
    .option-title {
      display: flex;
      align-items: center;
      margin-right: 20rpx;
      color: #999999;
    }
    .detail {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: baseline;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .txt {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .checked {
    display: flex;
  }
  .address {
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
  }
  .service {
    display: flex;
  }
  .service-detail {
    background-color: rgba(250, 53, 52, 0.1);
    color: #fa3534;
    padding: 8rpx 20rpx;
    border-radius: 8rpx;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: baseline;
  }

  .cell-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    &-line {
      background: #fa3534;
      width: 6rpx;
      height: 34rpx;
      margin-right: 8rpx;
    }
    &-title {
      font-weight: bold;
    }
    &-sub-title {
      display: flex;
      align-items: flex-end;
      font-size: 28rpx;
      font-weight: bold;
    }
    &-other {
      display: flex;
      font-size: 24rpx;
    }
  }
  .evaluate-cell {
    display: flex;
    .left {
      flex: 1;
      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      .user {
        display: flex;
      }
      .comment {
        margin-top: 14rpx;
        font-size: 26rpx;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .right {
      image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 8rpx;
      }
    }
  }

  .recommend-cell {
    margin: 0rpx -16rpx;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 44px;
    line-height: 12px;
    background-color: #ffffff;
    z-index: 999;
    display: flex;
    justify-items: center;
    justify-content: space-around;
    .bottom-option {
      display: flex;
      align-items: center;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 4rpx;
      font-size: 24rpx;
      image {
        width: 44rpx;
        height: 44rpx;
      }
    }
    .button {
      display: flex;
      align-items: center;
      .left {
        height: 68rpx;
        line-height: 68rpx;
        padding: 0rpx 24rpx;
        background-color: #fa3534;
        color: #ffffff;
        font-size: 28rpx;
        border-radius: 50rpx;
      }
      .right {
        margin-left: 24rpx;
        height: 68rpx;
        line-height: 68rpx;
        padding: 0rpx 24rpx;
        background-color: #000000;
        color: #ffffff;
        font-size: 28rpx;
        border-radius: 50rpx;
      }
    }
  }

  .poster-container {
    height: 100vh;
    .save-btn {
      width: 608rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: #0052d9;
      border-radius: 80rpx;
      color: #ffffff;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
