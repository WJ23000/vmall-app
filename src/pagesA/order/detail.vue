<template lang="pug">
view.vmall-order-detail
  view.container
    //- 订单状态
    view.status.my-24.px-32.py-28.bg-white
      view.flex.justify-between.items-center(v-if="orderInfo.status === 10")
        view.flex1.f-28-B 待付款
        view.price.flex.f-32 剩余：{{ countDownText }}
      view.flex.justify-between.items-center(v-if="orderInfo.status === 20")
        view.flex1.f-28-B 待发货
      view.flex.justify-between.items-center(v-if="orderInfo.status === 30")
        view.flex1.f-28-B 待收货
        view.flex(@click="onOrderLogistics")
          view.inform-text.f-28 查看物流
          up-icon(name="arrow-right" size="16" color="#0052d9")
      view.flex.justify-between.items-center(v-if="orderInfo.status === 50")
        view.flex1.f-28-B 已完成
        view.flex(@click="onOrderLogistics")
          view.inform-text.f-28 查看物流
          up-icon(name="arrow-right" size="16" color="#0052d9")
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
      view.cancel-btn.tc.f-28(@click.stop="onCancelPay") 取消支付
      view.pay-btn.ml-20.tc.f-28(@click.stop="onPay") 去付款
    view(v-if="orderInfo.status === 30")
      view.confirm-btn.ml-20.tc.f-28(@click.stop="onConfirmGoods") 确认收货
</template>

<script setup>
import { IMG_URL } from "@/config";
import DetailCard from "../components/order/detail-card.vue";
// 服务器图片
const IconRightBlue = ref(IMG_URL + "/images/icon-right-blue.png");

const orderId = ref();
const orderInfo = ref();
// 倒计时
const totalTime = ref();
const timer = ref(null);
const countDownText = ref();

onLoad((options) => {
  orderId.value = options.id;
  // getOrderDetail(options.id);
  orderInfo.value = {
    status: 50,
    address: {
      recipient: "大黑",
      mobile: "18056557800",
      province: "浙江省",
      city: "杭州市",
      county: "西湖区",
      address: "断桥残雪"
    },
    real_info: {
      realname: "大黑",
      identity: "240625202409205568"
    },
    goods: {
      price: 1540.5,
      quantity: 2,
      total_price: 1590.5,
      goods_name: "sk-ii sk2神仙水小灯泡精华大红瓶面霜套装",
      goods_spec_image: IMG_URL + "/goods/img.jpg"
    },
    createtime: "2024-09-20 09:35:21",
    pay_time: "2024-09-20 09:35:21",
    confirm_time: "2024-09-22 15:21:45",
    order_no: "20240002356689"
  };
  totalTime.value = 360;
  if (totalTime.value > 0) {
    countDown();
  }
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
const onOrderLogistics = () => {
  console.log("触发");
  uni.navigateTo({ url: "/pagesA/order/logistics?id=" + orderInfo.value.id });
};

// 取消支付(取消订单)
const onCancelPay = () => {
  // orderApi
  //   .cancelOrder({
  //     id: orderInfo.value.id
  //   })
  //   .then((res) => {
  //     if (res.code == 1) {
  //       uni.showToast({
  //         title: "订单已取消",
  //         icon: "success",
  //         mask: true
  //       });
  //       setTimeout(() => {
  //         uni.navigateBack();
  //       }, 1000);
  //     }
  //   });
  uni.navigateBack();
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
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.vmall-order-detail {
  .container {
    padding-bottom: 160rpx;
  }
  .icon-right {
    width: 48rpx;
    height: 48rpx;
  }
  .tip-text {
    color: #909193;
    vertical-align: middle;
  }
  .price {
    color: #fa3534;
  }
  .icon-img {
    width: 48rpx;
    height: 48rpx;
  }
  .inform-text {
    color: #0052d9;
  }
  .time-text {
    color: #909193;
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
  .cancel-btn {
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #ffffff;
    color: #000000;
    border-radius: 52rpx;
    border: 2rpx solid #e6e6e6;
  }
  .pay-btn {
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #fa3534;
    color: #ffffff;
    border-radius: 52rpx;
    border: 2rpx solid #fa3534;
  }
  .confirm-btn {
    width: 200rpx;
    height: 68rpx;
    line-height: 68rpx;
    background: #0052d9;
    color: #ffffff;
    border-radius: 52rpx;
    border: 2rpx solid #0052d9;
  }
}
</style>
