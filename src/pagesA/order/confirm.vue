<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-27 17:39:42
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.order-confirm
  view.container.pb-150
    view.address.flex.justify-start.items-center.my-24.px-32.py-60.bg-white(v-if="address.id" @click="onCheckAddress")
      view.flex1
        view.flex.f-32-B
          text.mr-28 {{ address.recipient}}
          text {{ address.mobile}}
        view.mt-12.f-28.ellipsis-2 {{ address.provinceCityArea }}
      image.icon-right.ml-20(:src="IconRight")
    view.address.flex.justify-start.items-center.my-24.px-32.py-60.bg-white(v-else @click="onCheckAddress")
      view.flex1 请选择地址
      image.icon-right.ml-20(:src="IconRight")
    view.info.px-32.py-28.bg-white.mb-20
      view.flex.justify-between
        text.f-32-B 配送方式
        text.f-28 快递 免运费
      view.flex.justify-between.mt-20(@click="onIdCardShow")
        view.f-32-B 身份信息
        view.flex.flex1.justify-end.items-center
          view.tip-text.flex.f-28(v-if="idcard.realname")
            text.mr-8 {{ idcard.realname }}
            text {{ idcard.identity }}
          view.tip-text.f-28(v-else) 请填写身份信息
          image.icon-right.ml-8(:src="IconRight")
    ShopCard(:item="orderInfo.spec")
    view.flex.justify-between.mt-20.px-32.py-32.bg-white
      text.f-28 商品总价
      text.price.f-32-B ￥{{orderInfo.spec.price}}
    view.info.px-32.py-28.bg-white.mt-20
      view.flex.justify-between
        text.f-32-B 支付方式
      view.flex.justify-between.mt-32
        view.flex.items-center.f-28
          image.icon-img.mr-16(:src="Wechat")
          text 微信
        view.flex(@click="onCheckWay")
          image.icon-img(v-if="checked" :src="CheckXz")
          image.icon-img(v-else :src="CheckWxz")
    view.inform-tip.mt-20.mx-24.f-28
      text 提交订单则表示你已同意
      text.inform-text(@click="notifyShow = true") 《消费值告知书》
      text 及
      text.inform-text(@click="contractShow = true") 《进口个人委托申报委托函》
  view.submit.px-32.flex.justify-between.items-center(@click="createOrder")
    view.flex.justify-start
      view.f-32 总计:
      view.price.f-32-B ￥{{ orderInfo.spec.price }}
    view.pay-btn.tc.f-32 立即支付
  //- 填写身份信息
  WriteIdCard(
    v-if="idCardShow"
    :isReadonly="isReadonly"
    :idCardInfo="idcard"
    @close="idCardShow=false"
    @tip="onIdCardTip"
    @confirm="onSaveIdCard")
  //- 身份信息提示
  IdCard(v-show="idCardTipShow" @confirm="onConfirm(1)")
  //- 消费值告知书
  Notify(v-show="notifyShow" @confirm="onConfirm(2)")
  //- 进口个人委托申报委托
  Contract(v-show="contractShow" @confirm="onConfirm(3)")
</template>

<script setup>
import { IMG_URL } from "@/config";
import ShopCard from "@/components/shop/card.vue";
import IdCard from "@/components/order/idcard.vue";
import Notify from "@/components/order/notify.vue";
import Contract from "@/components/order/contract.vue";
import WriteIdCard from "@/components/order/write-idcard.vue";
import { orderApi } from "@/api";
// 服务器图片
const UserAvatar = ref(IMG_URL + "/images/user-avatar.png");
const IconRight = ref(IMG_URL + "/images/icon-right.png");
const Wechat = ref(IMG_URL + "/images/wechat.png");
const CheckXz = ref(IMG_URL + "/images/check-xz.png");
const CheckWxz = ref(IMG_URL + "/images/check-wxz.png");

const checked = ref(true);
const idCardShow = ref(false);
const idCardTipShow = ref(false);
const notifyShow = ref(false);
const contractShow = ref(false);
// 地址id
const address = ref({
  id: "",
  provinceCityArea: "",
  recipient: "",
  mobile: ""
});
// 实名认证
const isReadonly = ref(false);
const idcard = ref({
  realname: "",
  identity: ""
});
const orderType = ref();
const orderInfo = ref({
  goods_spec_bind_id: "",
  cart_id: "",
  type: "",
  spec: {
    store_name: "",
    image: "",
    shop_name: "",
    name: "",
    price: ""
  }
});

onLoad((options) => {
  const spec = JSON.parse(options.spec);
  orderType.value = options.type;
  // 商品详情
  orderInfo.value = {
    goods_spec_bind_id: spec.goods_spec_bind_id ? spec.goods_spec_bind_id : "", // 商品详情下单用到
    cart_id: spec.id ? spec.id : "", // 购物车下单用到
    type: options.type,
    spec: spec
  };
  // 购物车
  if (options.type == "cart") {
    orderInfo.value.spec = {
      store_name: spec.shop_name,
      image: spec.image,
      shop_name: spec.goods_name,
      name: spec.goods_spec_name,
      price: spec.price
    };
  }
  // 初始化查询实名认证
  getIdCardInfo();
  // 初始化获取默认收货地址
  getAddressDefault();
});

onShow(() => {
  uni.$on("check-address", (data) => {
    address.value = {
      id: data.id,
      provinceCityArea: data.province + data.city + data.county + data.address,
      recipient: data.recipient,
      mobile: data.mobile
    };
  });
});

onUnload(() => {
  uni.$off("check-address");
});

// 显示实名认证弹窗(未实名认证时)
const onIdCardShow = () => {
  idCardShow.value = true;
};
// 获取实名认证
const getIdCardInfo = () => {
  orderApi.idCardInfo({}).then((res) => {
    if (res.code == 1) {
      const data = res.data;
      idcard.value = {
        realname: data.realname,
        identity: data.identity
      };
      idCardShow.value = false;
      isReadonly.value = true;
    }
  });
};
// 获取默认收货地址
const getAddressDefault = () => {
  orderApi.addressDefault().then((res) => {
    if (res.code == 1) {
      const data = res.data;
      address.value = {
        id: data.id,
        provinceCityArea: data.province + data.city + data.county + data.address,
        recipient: data.recipient,
        mobile: data.mobile
      };
    }
  });
};

// 切换支付方式
const onCheckWay = () => {
  checked.value = !checked.value;
};

// 下单
const createOrder = () => {
  // 校验收货地址
  if (address.value.id == "") {
    uni.showToast({
      title: "请选择收货地址",
      icon: "none",
      mask: true
    });
    return;
  }
  // 校验是否实名认证
  if (idcard.value.realname == "" || idcard.value.identity == "") {
    uni.showToast({
      title: "请实名认证",
      icon: "none",
      mask: true
    });
    idCardShow.value = true;
    return;
  }
  // 校验是否选中支付方式
  if (!checked.value) {
    uni.showToast({
      title: "请选择支付方式",
      icon: "none",
      mask: true
    });
    return;
  }
  orderApi
    .createOrder({
      goods_spec_bind_id: orderType.value == "goods" ? orderInfo.value.goods_spec_bind_id : "",
      cart_id: orderType.value == "cart" ? orderInfo.value.cart_id : "",
      address_id: address.value.id,
      money: orderInfo.value.spec.price
    })
    .then((res) => {
      if (res.code == 1) {
        // 去支付
        pay(res.data.order_no);
      }
    });
};

// 获取支付参数
const pay = (order_no) => {
  orderApi
    .pay({
      order_no,
      payment: "1",
      terminal: "miniapp"
    })
    .then((res) => {
      if (res.code == 1) {
        wxPay(res.data);
      }
    });
};

// 微信支付
const wxPay = (res) => {
  uni.requestPayment({
    provider: "wxpay",
    ...res,
    success: (res) => {
      uni.showToast({
        title: "支付成功",
        icon: "success",
        mask: true
      });
      uni.navigateTo({ url: "/pagesA/order/success" });
    },
    fail: function (err) {
      uni.showToast({
        title: "支付失败",
        icon: "error",
        mask: true
      });
      uni.navigateTo({ url: "/pagesA/order/list" });
    }
  });
};

// 关闭身份信息填写
const onCloseIdCardShow = () => {
  idCardShow.value = false;
};

// 身份提示信息和填写身份信息
const onIdCardTip = () => {
  idCardTipShow.value = true;
};
const onSaveIdCard = (form) => {
  orderApi
    .idCardAuthor({
      realname: form.realname,
      identity: form.identity
    })
    .then((res) => {
      if (res.code == 1) {
        getIdCardInfo();
      }
    });
};

// 信息框
const onConfirm = (type) => {
  switch (type) {
    case 1:
      idCardTipShow.value = false;
      break;
    case 2:
      notifyShow.value = false;
      break;
    case 3:
      contractShow.value = false;
      break;
    default:
      break;
  }
};

// 选择收货地址
const onCheckAddress = () => {
  uni.navigateTo({ url: "/pagesA/address/index?type=cart" });
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
</style>
<style lang="stylus" scoped>
.order-confirm
  .icon-right
    width: 48rpx;
    height: 48rpx;
  .tip-text
    color: #909193;
    vertical-align: middle;
  .price
    color: #F53F3F;
  .icon-img
    width: 48rpx;
    height: 48rpx;
  .inform-tip
    line-height: 60rpx;
  .inform-text
    color: #0052D9;
  .submit
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background: #ffffff;
    box-sizing: border-box;
  .pay-btn
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #E84026;
    color: #ffffff;
    border-radius: 52rpx;
</style>
