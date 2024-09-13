<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-26 16:56:06
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.order-detail
  view.container.pb-160
    //- 订单状态
    view.status.my-24.px-32.py-20.bg-white
      view.flex.justify-between.items-center(v-if="orderInfo.status === 10")
        view.flex1.f-28-B 待付款
        view.price.flex.f-32 剩余：{{ countDownText }}
      view.flex.justify-between.items-center(v-if="orderInfo.status === 20")
        view.flex1.f-28-B 待发货
      view.flex.justify-between.items-center(v-if="orderInfo.status === 30")
        view.flex1.f-28-B 待收货
        view.flex(@click="onSpecif")
          view.inform-text.f-32 查看物流
          image.icon-right(:src="IconRightBlue")
      view.flex.justify-between.items-center(v-if="orderInfo.status === 50")
        view.flex1.f-28-B 已完成
        view.flex(@click="onSpecif")
          view.inform-text.f-32 查看物流
          image.icon-right(:src="IconRightBlue")
      view.flex.justify-between.items-center(v-if="orderInfo.status === 51")
        view.flex1.f-28-B 已取消
    view.address.flex.column.justify-start.my-24.px-32.py-36.bg-white
      view.flex.f-32-B
        text.mr-28 {{ orderInfo.address.recipient }}
        text {{ orderInfo.address.mobile}}
      view.mt-12.f-28
        text {{ orderInfo.address.province }}
        text {{ orderInfo.address.city }}
        text {{ orderInfo.address.county }}
        text {{ orderInfo.address.address}}
    view.info.px-32.py-28.bg-white.mb-20
      view.flex.justify-between.items-center
        view.f-32-B 身份信息
        view.tip-text.f-28
          text {{ orderInfo.real_info.realname }}
          text {{ orderInfo.real_info.identity }}
    DetailCard(:item="orderInfo")
    view.flex.justify-between.mt-20.px-32.py-32.bg-white
      text.f-28 商品总价
      text.price.f-32-B ￥{{ orderInfo.goods.total_price }}
    view.info.px-32.py-28.my-20.bg-white
      view.flex.justify-between.items-center
        view.f-32-B 配送方式
        view.tip-text.f-28 快递 免运费
    view.time.px-32.py-28.bg-white.f-28
      view.flex
        text.time-text 创建时间：
        text {{ orderInfo.createtime }}
      view.flex.mt-24
        text.time-text 支付时间：
        text {{ orderInfo.pay_time }}
      view.flex.mt-24
        text.time-text 收货时间：
        text {{ orderInfo.confirm_time }}
  view.submit.px-32.flex.justify-end.items-center(v-if="orderInfo.status === 10 || orderInfo.status === 30")
    view.flex(v-if="orderInfo.status === 10")
      view.cancel-btn.tc.f-32(@click.stop="onCancelPay") 取消支付
      view.pay-btn.ml-20.tc.f-32(@click.stop="onPay") 去付款
    view(v-if="orderInfo.status === 30")
      view.confirm-btn.ml-20.tc.f-32(@click.stop="onConfirmGoods") 确认收货
</template>

<script setup>
import { IMG_URL } from "@/config";
import DetailCard from "@/components/order/detail-card.vue";
import { orderApi } from "@/api";
// 服务器图片
const UserAvatar = ref(IMG_URL + "/images/user-avatar.png");
const IconRightBlue = ref(IMG_URL + "/images/icon-right-blue.png");
const Wechat = ref(IMG_URL + "/images/wechat.png");
const CheckXz = ref(IMG_URL + "/images/check-xz.png");
const CheckWxz = ref(IMG_URL + "/images/check-wxz.png");
const orderId = ref();
const orderInfo = ref();
// 倒计时
const totalTime = ref();
const timer = ref(null);
const countDownText = ref();

onLoad((options) => {
  orderId.value = options.id;
  getOrderDetail(options.id);
});

onUnload(() => {
  clearInterval(timer.value);
});

// 获取订单详情
const getOrderDetail = (id) => {
  orderApi.orderDetail({ id }).then((res) => {
    orderInfo.value = res.data;
    totalTime.value = res.data.remain_time;
    if (totalTime.value > 0) {
      countDown();
    }
  });
};

// 查看物流
const onSpecif = () => {
  uni.navigateTo({ url: "/pagesA/order/logistics?id=" + orderInfo.value.id });
};

// 取消支付(取消订单)
const onCancelPay = () => {
  orderApi
    .cancelOrder({
      id: orderInfo.value.id
    })
    .then((res) => {
      if (res.code == 1) {
        uni.showToast({
          title: "订单已取消",
          icon: "success",
          mask: true
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      }
    });
};

// 去付款
const onPay = () => {
  orderApi
    .pay({
      order_no: orderInfo.value.order_no,
      payment: "1",
      terminal: "miniapp"
    })
    .then((res) => {
      if (res) {
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
    }
  });
};

// 确认收货
const onConfirmGoods = () => {
  orderApi
    .confirmGoods({
      id: orderInfo.value.id
    })
    .then((res) => {
      if (res.code == 1) {
        uni.showToast({
          title: "收货成功",
          icon: "success",
          mask: true
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      }
    });
};

const countDown = () => {
  timer.value = setInterval(() => {
    if (totalTime.value >= 0) {
      countDownFn();
    } else {
      clearInterval(timer.value); // 停止调用计时器函数
      getOrderDetail(orderInfo.value.id);
    }
  }, 1000); // 以毫秒为单位，每1秒调用一次
};
// 待支付倒计时
const countDownFn = () => {
  let seconds,
    minutes,
    timerMsg = "";

  seconds = Math.floor(totalTime.value % 60); // 秒
  minutes = Math.floor((totalTime.value / 60) % 60); // 分
  timerMsg = (minutes >= 10 ? minutes : "0" + minutes) + ":" + (seconds >= 10 ? seconds : "0" + seconds);
  // 替换掉页面内容
  countDownText.value = timerMsg;
  totalTime.value = totalTime.value - 1;
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
</style>
<style lang="stylus" scoped>
.order-detail
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
  .inform-text
    color: #0052D9;
  .time-text
    color: #909193
  .submit
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background: #ffffff;
    box-sizing: border-box;
  .cancel-btn
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #ffffff;
    color: #000000;
    border-radius: 52rpx;
    border: 2rpx solid #E6E6E6;
  .pay-btn
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #E84026;
    color: #ffffff;
    border-radius: 52rpx;
    border: 2rpx solid #E84026;
  .confirm-btn
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #0052D9;
    color: #ffffff;
    border-radius: 52rpx;
    border: 2rpx solid #0052D9;
</style>
