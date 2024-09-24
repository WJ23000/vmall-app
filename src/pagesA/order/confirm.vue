<template lang="pug">
view.vmall-order-confirm
  view.container.pb-150
    view.address.flex.justify-start.items-center.my-24.px-32.py-60.bg-white(v-if="address.id" @click="onCheckAddress")
      view.flex1
        view.flex.f-32-B
          text.mr-28 {{ address.recipient}}
          text {{ address.mobile}}
        view.mt-12.f-28.ellipsis-2 {{ address.provinceCityArea }}
      u-icon.ml-20(name="arrow-right" size="16" color="#333333")
    view.address.flex.justify-start.items-center.my-24.px-32.py-60.bg-white(v-else @click="onCheckAddress")
      view.flex1 请选择地址
      u-icon.ml-20(name="arrow-right" size="16" color="#333333")
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
          u-icon.ml-8(name="arrow-right" size="16" color="#333333")
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
          image.icon-img(v-if="checked" :src="IconXz")
          image.icon-img(v-else :src="IconWxz")
    view.inform-tip.mt-20.mx-24.f-28
      text 提交订单则表示你已同意
      text.inform-text(@click="notifyShow = true") 《消费值告知书》
      text 及
      text.inform-text(@click="contractShow = true") 《进口个人委托申报委托函》
  view.submit.px-32.flex.justify-between.items-center(@click="onCreateOrder")
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

// 服务器图片
const IconRight = ref(IMG_URL + "/images/icon-right.png");
const Wechat = ref(IMG_URL + "/wechat.png");
const IconXz = ref(IMG_URL + "/cart/check-xz.png");
const IconWxz = ref(IMG_URL + "/cart/check-wxz.png");

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
const isReadonly = ref(true);
const idcard = ref({
  realname: "大黑",
  identity: "240625202409205568"
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
  // const spec = JSON.parse(options.spec);
  orderType.value = options.type;
  // 商品详情
  // orderInfo.value = {
  //   goods_spec_bind_id: spec.goods_spec_bind_id ? spec.goods_spec_bind_id : "", // 商品详情下单用到
  //   cart_id: spec.id ? spec.id : "", // 购物车下单用到
  //   type: options.type,
  //   spec: spec
  // };
  orderInfo.value = {
    goods_spec_bind_id: "1", // 商品详情下单用到
    cart_id: "0002", // 购物车下单用到
    type: options.type,
    spec: {
      store_name: "大黑店铺",
      image: "http://cdn.wjaxx.xyz/goods/img.jpg",
      shop_name: "sk-ii sk2神仙水小灯泡精华大红瓶面霜套装",
      name: "蓝色",
      price: "1540.5"
    }
  };
  // 购物车
  if (options.type == "cart") {
    // orderInfo.value.spec = {
    //   store_name: spec.shop_name,
    //   image: spec.image,
    //   shop_name: spec.goods_name,
    //   name: spec.goods_spec_name,
    //   price: spec.price
    // };
    orderInfo.value.spec = {
      store_name: "大黑店铺",
      image: "http://cdn.wjaxx.xyz/goods/img.jpg",
      shop_name: "sk-ii sk2神仙水小灯泡精华大红瓶面霜套装",
      name: "http://cdn.wjaxx.xyz/goods/img.jpg",
      price: "1540.5"
    };
  }
  // 初始化查询实名认证
  // getIdCardInfo();
  // 初始化获取默认收货地址
  // getAddressDefault();
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
const onCreateOrder = () => {
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
  // orderApi
  //   .createOrder({
  //     goods_spec_bind_id: orderType.value == "goods" ? orderInfo.value.goods_spec_bind_id : "",
  //     cart_id: orderType.value == "cart" ? orderInfo.value.cart_id : "",
  //     address_id: address.value.id,
  //     money: orderInfo.value.spec.price
  //   })
  //   .then((res) => {
  //     if (res.code == 1) {
  //       // 去支付
  //       pay(res.data.order_no);
  //     }
  //   });
  uni.navigateTo({ url: "/pagesA/order/success" });
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
<style lang="scss" scoped>
.vmall-order-confirm {
  .tip-text {
    color: #909193;
    vertical-align: middle;
  }
  .price {
    color: #f53f3f;
  }
  .icon-img {
    width: 48rpx;
    height: 48rpx;
  }
  .inform-tip {
    line-height: 60rpx;
  }
  .inform-text {
    color: #0052d9;
  }
  .submit {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background: #ffffff;
    box-sizing: border-box;
  }
  .pay-btn {
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #e84026;
    color: #ffffff;
    border-radius: 52rpx;
  }
}
</style>
