<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-19 17:21:40
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.down-menu
  view.tab
    view.item(
      v-for="(item, index) in tabList",
      :key="index",
      :class="tabActive == item.name ? 'black bold' : ''",
      @click="onTabItem(item.name, index)")
      view
        text {{ item.name }}
        text(v-if="tabActive == item.name" :class="item.sort ? 'arrow-up .up-active' : 'arrow-down .down-active'")
        text(v-else :class="item.sort ? 'arrow-up' : 'arrow-down'")
  //- 遮罩层
  u-overlay(:show="maskShow", :z-index="10", opacity="0.6" @click="onMaskClose")
  //- 面板
  view.mask-content(v-if="maskShow", @tap.stop)
    //- 最新上架
    view.container(v-if="tabActive == '品牌'")
      view.cell.flex.justify-center.items-center.h-88(
        v-for="(pitem, pindex) in brandList",
        :key="pindex",
        :class="form.brand == pitem.id ? 'black' : ''",
        @click="onBrandItem(pitem)")
        text.f-28.bold {{ pitem.name }}
    //- 类型
    view.container(v-if="tabActive == '类型'")
      view.cell.flex.justify-center.items-center.h-88(
        v-for="(titem, tindex) in typeList",
        :key="tindex",
        :class="form.type == titem.id ? 'black' : ''",
        @click="onTypeItem(titem)")
        text.f-28.bold {{ titem.name }}
    //- 价格
    view(v-if="tabActive == '价格'")
      view.content-list.pb-32
        view.item(
          v-for="(item, index) in priceList",
          :key="index",
          :class="form.price == item.id ? 'content-active' : ''",
          @click="onPriceItem(item)") {{ item.name }}
      //- view.flex.column.px-32.py-32
      //-   view.flex.items-center.mb-32
      //-     up-input(
      //-       fontSize="28rpx"
      //-       placeholder="最低价格（万元）",
      //-       border="surround",
      //-       shape="circle",
      //-       type="number",
      //-       :customStyle="inputStyle",
      //-       v-model="form.lowestPrice",
      //-       @blur="onPriceBlur")
      //-     text.mx-16 -
      //-     up-input(
      //-       fontSize="28rpx"
      //-       placeholder="最高价格（万元）",
      //-       border="surround",
      //-       shape="circle",
      //-       type="number",
      //-       :customStyle="inputStyle",
      //-       v-model="form.highestPrice",
      //-       @blur="onPriceBlur")
      //-   button.confirm-btn.tc.f-28(@click="onPriceConfirm") 确认
</template>

<script setup>
import { IMG_URL } from "@/config";
import { baseApi } from "@/api";
// 服务器图片
const Reset = ref(IMG_URL + "/reset.png");

const emit = defineEmits(["scrollShow", "paramData", "reset"]);
const tabList = ref([
  {
    name: "品牌",
    sort: false
  },
  {
    name: "类型",
    sort: false
  },
  {
    name: "价格",
    sort: false
  }
]);
const tabActive = ref();
const maskShow = ref(false);
// 品牌
const brandList = ref([]);
// 类型
const typeList = ref([]);
// 价格
const priceList = ref([]);
const form = ref({
  brand: "",
  type: "",
  price: "0-0",
  lowestPrice: "",
  highestPrice: ""
});
const inputStyle = ref({
  background: "#f7f7f7",
  border: "1px solid #f7f7f7"
});
const isResult = ref(false);

onMounted(() => {
  getGoodSelect();
});

// 商品列表页下拉参数
const getGoodSelect = () => {
  baseApi.goodsSelect().then((res) => {
    brandList.value = res.data.brand;
    typeList.value = res.data.type;
    priceList.value = res.data.price;
  });
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
const onBrandItem = (item) => {
  form.value.brand = item.id;
  emit("paramData", form.value);
  initStatus();
};
const onTypeItem = (item) => {
  form.value.type = item.id;
  emit("paramData", form.value);
  initStatus();
};
const onPriceItem = (item) => {
  form.value.price = item.id;
  emit("paramData", form.value);
  initStatus();
  // form.value.lowestPrice = "";
  // form.value.highestPrice = "";
};
const onPriceBlur = (item) => {
  form.value.price = {};
};
const onPriceConfirm = () => {
  emit("paramData", form.value);
  initStatus();
};

// 重置筛选项
const onReset = () => {
  tabActive.value = "";
  form.value = {
    brand: {},
    InstanceType: {},
    price: {},
    lowestPrice: "",
    highestPrice: ""
  };
  emit("reset");
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

// 判断tab选中的筛选项
const initTabResult = () => {
  return form.value.price.name || form.value.lowestPrice || form.value.highestPrice;
};
</script>

<style lang="stylus" scoped>
.down-menu
  position: fixed;
  top: 88rpx;
  width: 100%;
  z-index: 200;
  .tab
    position: relative;
    display: flex;
    height: 44px;
    line-height: 44px;
    background: #f5f5f5;
    z-index: 10060;
    .item
      width: 33.3333%;
      text-align: center;
      font-size: 26rpx;
      color: #888888;
  .tab-result
    position: relative;
    display: flex;
    height: 36px;
    line-height: 36px;
    background: #f5f5f5;
    z-index: 10060;
    .item
      margin-right: 16rpx;
      width: 33%;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      font-size: 26rpx;
      background: #ececec;
      border-radius: 156rpx;
  .mask-content
    position: absolute;
    width: 100%;
    background: #ffffff;
    z-index: 10060;
    box-sizing: border-box;
    border-radius: 0rpx 0rpx 32rpx 32rpx;
    .container
      height: 352rpx;
      overflow-y: auto;
  .cell
    color: #909193;
    font-size: 26rpx;
    // border-bottom: 2rpx solid #f5f5f5;
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
  .content-list
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .item
      margin: 32rpx 16rpx 0rpx 0rpx;
      width: 23%;
      height: 64rpx;
      line-height: 64rpx;
      padding: 0rpx 20rpx;
      background: #F5F5F5;
      color: #909193;
      border: 2rpx solid #F5F5F5;
      font-size: 28rpx;
      border-radius: 50rpx;
      text-align: center;
    .item:nth-child(3n)
      margin-right: 0rpx;
  .content-active
    background: #303133 !important;
    color: #ffffff !important;
    border: 2rpx solid  #303133 !important;
  .confirm-btn
    width: 686rpx;
    height: 76rpx;
    line-height: 76rpx;
    background: #303133;
    color: #ffffff;
    border-radius: 98rpx;
    .confirm-btn:after
      border: none;
</style>
