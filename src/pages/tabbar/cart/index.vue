<template lang="pug">
view.vmall-cart
  up-navbar(
    title=""
    :safeAreaInsetTop="false")
    template(#left)
      text 购物车
    template(#right)
      text.f-24(@click="onRightEdit") 编辑
  view.page-content
    view(v-if="cartItems.length > 0 ? true : false")
      view.cart-cell(v-for="(item,index) in cartItems" :key="index")
        view.cart-box(:data-id="item.id" :data-index="index")
          view.icon-main
            image(:src="iconXz" v-if="item.selected" @click="selectedCart(index)" :data-index="index")
            image(:src="iconWxz" v-else @click="selectedCart(index)" :data-index="index")
          view.cart-main
            view.left_image
              image.cart-image(:src="item.url")
            view.left_box
              text.cart-title {{item.title}}
              text.cart-specif {{item.specif}}
              view.cart-count
                view.cart-money
                  text.cart-unit ￥
                  text.cart-price {{item.price}}
                view
                  text(@click='reduce'  class="input cart-reduce"  :data-index="index") -
                  text(class="input cart-text") {{item.value}}
                  text(@click='add' class="input cart-add"  :data-index="index") +
      <!-- 底部 -->
      view(v-if="showBottom")
        view.del-bottom
          view.cart-bottom-cell(@click='cancel') 取消
          view(class='cart-bottom-cell del-color' @click='del') 删除({{delCount}})
      view(v-else)
        view.cart-bottom
          view.cart-bottom-icon
            image(:src="iconXz" v-if="CheckAll" @click="select")
            image(:src="iconWxz" v-else @click="select")
          view.checkAll 全选
          view.cart-sum
            text.sum_text 合计：
            text.sum_color ￥{{total}}元
          view.cart-pay
            text.cart_pay(@click="payOrder") 去结算({{goodsCount}})
    <!--如果无数据，则显示数据-->
    u-empty(
      v-else
      mode="car"
      icon="http://cdn.uviewui.com/uview/empty/car.png")
  <!-- 为您推荐 -->
  view.wrap
    u-divider(text="为您推荐")
    Waterfall(ref="waterfallRef" :loadStatus="loadStatus" :flowList.sync="flowList" @addRandomData="addRandomData")
    BackTop(:backTop="backTop")
</template>

<script setup>
import { random, guid } from "uview-plus";
import Waterfall from "@/components/waterfall.vue";
import BackTop from "@/components/backTop.vue";
import { GOODS_DATA } from "@/model";

const cartItems = ref([
  {
    id: 1,
    title: "sk-ii sk2神仙水小灯泡精华大红瓶面霜套装",
    price: 1540.0,
    specif: "自营",
    value: 1,
    sell: 101,
    url: "http://cdn.wjaxx.xyz/goods/img.jpg",
    selected: false
  },
  {
    id: 2,
    title: "Whoo后天气丹礼盒花献光彩紧颜水乳礼盒7件",
    price: 1590.0,
    specif: "专卖店",
    value: 2,
    sell: 102,
    url: "http://cdn.wjaxx.xyz/goods/img2.jpg",
    selected: false
  }
]);
const total = ref(0);
const CheckAll = ref(false);
const goodsCount = ref(0);
const delCount = ref(0);
const showBottom = ref(false);
const iconXz = ref("http://cdn.wjaxx.xyz/cart/check-xz.png");
const iconWxz = ref("http://cdn.wjaxx.xyz/cart/check-wxz.png");
// 商品瀑布流列表
const loadStatus = ref("loadmore");
const flowList = ref([]);
const goodsList = ref(GOODS_DATA);
const waterfallRef = ref();
// 返回顶部
const backTop = ref(0);

onLoad(() => {
  addRandomData();
});

// 购物车
// 全选
const select = (e) => {
  let setCheckAll = CheckAll.value;

  setCheckAll = !setCheckAll;
  const setCartItems = cartItems.value;

  for (let i = 0; i < setCartItems.length; i++) {
    setCartItems[i].selected = setCheckAll;
  }

  (cartItems.value = setCartItems), (CheckAll.value = setCheckAll);
  // 计算总金额
  getSumTotal();
  // 计算商品数量
  getGoodsCount();
  // 计算删除数量
  delGoodsCount();
};
// 加
const add = (e) => {
  const setCartItems = cartItems.value; // 获取购物车列表
  console.log("触发了不");
  const index = e.currentTarget.dataset.index; // 获取当前点击事件的下标索引
  console.log(index);
  let value = setCartItems[index].value; // 获取购物车里面的value值

  value++;
  setCartItems[index].value = value;
  cartItems.value = setCartItems;
  getSumTotal();
};
// 减
const reduce = (e) => {
  const setCartItems = cartItems.value; // 获取购物车列表
  const index = e.currentTarget.dataset.index; // 获取当前点击事件的下标索引
  let value = setCartItems[index].value; // 获取购物车里面的value值
  if (value == 1) {
    value--;
    setCartItems[index].value = 1;
  } else {
    value--;
    setCartItems[index].value = value;
  }
  cartItems.value = setCartItems;
  getSumTotal();
};
// 单选
const selectedCart = (index) => {
  const setCartItems = cartItems.value; // 获取购物车列表
  const selected = setCartItems[index].selected; // 获取当前点击事件的下标索引是否选中
  // 取反
  setCartItems[index].selected = !selected;
  cartItems.value = setCartItems;
  // 计算总金额
  getSumTotal();
  // 计算商品数量
  getGoodsCount();
  // 计算删除数量
  delGoodsCount();
};

// 删除
const del = (e) => {
  let delState = true;
  let setCartItems = cartItems.value; // 获取购物车列表
  console.log(setCartItems.length);
  for (let i = 0; i < setCartItems.length; i++) {
    if (setCartItems[i].selected == delState) {
      setCartItems.splice(i, 1);
      // 更新删除数量数据
      delCount.value = i;
      i = i - 1;
    }
  }
  cartItems.value = setCartItems;
  total.value = 0;
  goodsCount.value = 0;
  CheckAll.value = false;
};
// 删除数量方法
const delGoodsCount = () => {
  let count = 0;
  for (let i = 0; i < cartItems.value.length; i++) {
    if (cartItems.value[i].selected) {
      count = count + 1;
    }
  }
  // 更新删除数量数据
  delCount.value = count;
};
// 结算
const payOrder = () => {
  // this.$router.push({ path: "/payOrder", params: { orderId: 1 } });
};
// 合计
const getSumTotal = () => {
  let sum = 0;
  for (let i = 0; i < cartItems.value.length; i++) {
    if (cartItems.value[i].selected) {
      sum += cartItems.value[i].value * cartItems.value[i].price;
    }
  }
  // 更新数据
  total.value = sum;
};
// 商品总数量
const getGoodsCount = () => {
  let count = 0;
  for (let i = 0; i < cartItems.value.length; i++) {
    if (cartItems.value[i].selected) {
      count = count + 1;
    }
  }
  // 更新数据
  goodsCount.value = count;
};
//编辑
const onRightEdit = () => {
  showBottom.value = true;
};
//取消删除功能
const cancel = () => {
  showBottom.value = false;
};

// 监听页面滚动(返回顶部)
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

<style>
page {
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.vmall-cart {
  .cart-header {
    height: 88rpx;
    line-height: 88rpx;
    /* #ifdef APP-PLUS */
    ::v-deep .u-navbar--fixed {
      top: var(--status-bar-height);
    }
    /* #endif */
  }

  .page-content {
    margin-top: 88rpx;
    /* #ifdef MP */
    margin-top: 88rpx;
    /* #endif */
    /* #ifdef APP-PLUS */
    margin-top: var(--status-bar-height);
    /* #endif */
    .cart-main {
      display: flex;
      margin-right: 20rpx;
    }

    .cart-active {
      float: left;
      width: 100%;
      background: #ffffff;
      border-bottom: 2rpx solid #f2f2f2;
    }

    .cart-image {
      width: 200rpx;
      height: 200rpx;
      float: left;
      margin: 20rpx 10rpx;
    }

    .cart-box {
      display: flex;
      background: white;
      border-radius: 8rpx;
    }

    .cart-boxtwo {
      display: flex;
      flex-direction: column;
    }

    .left_box {
      margin-left: 8rpx;
      margin-top: 20rpx;
      line-height: 60rpx;
    }

    .cart-title {
      font-size: 28rpx;
      line-height: 34rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }

    .cart-count {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cart-unit {
      font-size: 24rpx;
      color: #fa3534;
    }

    .cart-money {
      display: flex;
      align-items: center;
    }

    .cart-price {
      display: flex;
      color: #fa3534;
      font-size: 30rpx;
      height: 36rpx;
      line-height: 36rpx;
    }

    .cart-specif {
      padding: 4rpx 12rpx;
      background: #fa3534;
      color: #ffffff;
      font-size: 24rpx;
      height: 36rpx;
      line-height: 36rpx;
      margin-bottom: 10rpx;
      border-radius: 50rpx;
    }

    .right {
      float: right;
      width: 5%;
    }

    .right image {
      width: 50rpx;
      height: 50rpx;
      float: right;
      margin-right: 30rpx;
    }

    .input {
      display: block;
      width: 65rpx;
      height: 65rpx;
      line-height: 65rpx;
      text-align: center;
      float: left;
    }

    .cart-add {
      border-left: none;
      border: 2rpx solid #ededed;
      border-radius: 0rpx 40rpx 40rpx 0rpx;
      font-size: 36rpx;
    }

    .cart-reduce {
      border-right: none;
      border: 2rpx solid #ededed;
      border-radius: 40rpx 0rpx 0rpx 40rpx;
      font-size: 36rpx;
    }

    .cart-text {
      width: 90rpx;
      border-top: 2rpx solid #ededed;
      border-bottom: 2rpx solid #ededed;
      font-size: 30rpx;
    }

    .cart-bottom {
      display: flex;
      position: fixed;
      width: 100%;
      height: 88rpx;
      bottom: var(--window-bottom);
      background: #ffffff;
      padding: 0rpx 20rpx;
      box-sizing: border-box;
      border-top: 2rpx solid #f2f2f2;
      z-index: 999;
    }

    .cart-bottom-icon {
      margin-top: 22rpx;

      image {
        width: 40rpx !important;
        height: 40rpx !important;
      }
    }

    .yuan {
      display: block;
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
      border: 2rpx solid red;
    }

    .SpCart {
      display: block;
      width: 300rpx;
      height: 300rpx;
    }

    .Sptext {
      font-size: 30rpx;
    }

    .cart-icon {
      margin: 26rpx 20rpx;
      float: left;
    }

    .cart-sum {
      width: 300rpx;
      height: 100%;
      line-height: 87rpx;
      float: left;
      text-align: center;
      margin-left: 20rpx;
      font-size: 28rpx;
    }

    .cart-pay {
      position: absolute;
      width: 230rpx;
      height: 100%;
      background: #fa3534;
      right: 0;
    }

    .cart_pay {
      display: block;
      line-height: 87rpx;
      text-align: center;
      font-size: 30rpx;
      color: white;
    }

    .sum_color {
      color: #fa3534;
      font-size: 25rpx;
    }

    .sum_text {
      font-size: 30rpx;
    }

    .checkAll {
      margin-left: 20rpx;
      line-height: 87rpx;
      font-size: 28rpx;
    }

    .cart-cell {
      display: flex;
      padding: 20rpx 20rpx 0rpx 20rpx;
      box-sizing: border-box;
    }

    .nodata_text {
      background: #ffffff;
      color: black;
      font-size: 28rpx;
      text-align: center;
    }

    .nodata_text {
      image {
        margin-top: 100rpx;
        width: 44%;
        height: 300rpx;
      }
    }

    .icon-main {
      margin: 94rpx 20rpx;
      background: #ffffff;

      image {
        width: 40rpx !important;
        height: 40rpx !important;
      }
    }

    /* 底部 */
    .del-bottom {
      position: fixed;
      width: 100%;
      height: 88rpx;
      bottom: var(--window-bottom);
      background: #ffffff;
      border-top: 2rpx solid #f2f2f2;
      z-index: 999;
    }

    .cart-bottom-edit {
      float: left;
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-size: 28rpx;
      color: #fa3534;
    }

    .cart-bottom-cell {
      float: left;
      width: 49.725%;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-size: 28rpx;
      color: #999999;
      border-right: 2rpx solid #f2f2f2;
    }

    .cart-bottom-cell:last-child {
      border-right: 0rpx;
    }

    .del-color {
      color: #fa3534;
    }
  }

  .wrap {
    padding: 0rpx 10rpx 100rpx 10rpx;
  }

  ::v-deep .u-empty {
    background: #ffffff;
    margin-bottom: 40rpx;
    padding-bottom: 40rpx;
  }
}

.cart-right {
  font-size: 26rpx;
}

::v-deep .u-status-bar {
  display: none !important;
}
</style>
