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
    view(v-if="cartList.length > 0 ? true : false")
      Cart(
        :cartList="cartList" 
        @delete="onDelete" 
        @select="onSelect"
        @minus="onMinus"
        @add="onAdd")
      //- 底部-删除
      view(v-if="showBottom")
        view.del-bottom
          view.cart-bottom-cell(@click='onCancel') 取消
          view(class='cart-bottom-cell del-color' @click='onDeleteAll') 删除({{ deleteCount }})
      //- 底部-结算
      view(v-else)
        view.cart-bottom
          view.cart-bottom-icon
            image(:src="iconXz" v-if="CheckAll" @click="onSelectAll")
            image(:src="iconWxz" v-else @click="onSelectAll")
          view.checkAll 全选
          view.cart-sum
            text.sum_text 合计：
            text.sum_color ￥{{ totalPrice }}元
          view.cart-pay
            text.cart_pay(@click="payOrder") 去结算({{ goodsCount }})
    //- 如果无数据，则显示数据
    u-empty(
      v-else
      mode="car"
      icon="http://cdn.uviewui.com/uview/empty/car.png")
  //- 为您推荐
  view.wrap
    u-divider(text="为您推荐")
    Waterfall(ref="waterfallRef" :loadStatus="loadStatus" :flowList.sync="flowList" @addRandomData="addRandomData")
    BackTop(:backTop="backTop")
</template>

<script setup>
import { random, guid } from "uview-plus";
import Cart from "@/components/cart.vue";
import Waterfall from "@/components/waterfall.vue";
import BackTop from "@/components/backTop.vue";
import { GOODS_DATA, CART_GOODS_DATA } from "@/model";

const cartList = ref([...CART_GOODS_DATA]);
const totalPrice = ref(0);
const CheckAll = ref(false);
const goodsCount = ref(0);
const deleteCount = ref(0);
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
const onSelectAll = (e) => {
  for (let i = 0; i < cartList.value.length; i++) {
    cartList.value[i].selected = !CheckAll.value;
  }
  CheckAll.value = !CheckAll.value;
  getSumTotal();
  getGoodsCount();
  deleteGoodsCount();
};
// 反选
const onSelect = (index) => {
  cartList.value[index].selected = !cartList.value[index].selected;
  CheckAll.value = !cartList.value.some((item) => item.selected == false);
  getSumTotal();
  getGoodsCount();
  deleteGoodsCount();
};
// 加
const onAdd = (index) => {
  cartList.value[index].quantity++;
  getSumTotal();
};
// 减
const onMinus = (index) => {
  if (cartList.value[index].quantity == 1) {
    return;
  }
  cartList.value[index].quantity--;
  getSumTotal();
};
// 单个删除选中的商品
const onDelete = (index) => {
  cartList.value.splice(index, 1);
  getSumTotal();
  getGoodsCount();
  deleteGoodsCount();
};
// 批量删除选中的商品
const onDeleteAll = (e) => {
  for (let i = 0; i < cartList.value.length; i++) {
    if (cartList.value[i].selected == true) {
      cartList.value.splice(i, 1);
      deleteCount.value = i;
      i = i - 1;
    }
  }
  totalPrice.value = 0;
  goodsCount.value = 0;
  deleteCount.value = 0;
  CheckAll.value = false;
};
// 删除数量方法
const deleteGoodsCount = () => {
  let count = 0;
  for (let i = 0; i < cartList.value.length; i++) {
    if (cartList.value[i].selected) {
      count = count + 1;
    }
  }
  deleteCount.value = count;
};
// 合计
const getSumTotal = () => {
  let sum = 0;
  for (let i = 0; i < cartList.value.length; i++) {
    if (cartList.value[i].selected) {
      sum += cartList.value[i].quantity * cartList.value[i].price;
    }
  }
  totalPrice.value = sum;
};
// 商品总数量
const getGoodsCount = () => {
  let count = 0;
  for (let i = 0; i < cartList.value.length; i++) {
    if (cartList.value[i].selected) {
      count = count + 1;
    }
  }
  goodsCount.value = count;
};
// 编辑
const onRightEdit = () => {
  showBottom.value = true;
};
// 取消删除功能
const onCancel = () => {
  showBottom.value = false;
};
// 结算
const payOrder = () => {
  // this.$router.push({ path: "/payOrder", params: { orderId: 1 } });
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
  cartList.value = CART_GOODS_DATA;
  console.log("商品列表", cartList.value);
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
