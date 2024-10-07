<template lang="pug">
view.vmall-order-logistics
  view.my-24
    OrderLogistics(:item="logisticsInfo")
  view.px-32.py-32.bg-white
    view.mb-40 物流详情
    up-line(color="#EEEEEE")
    view.info.mt-30(v-if="logisticsInfo.express_list.length > 0")
      up-steps(current="1" direction="column" activeColor="#0052D9")
        up-steps-item(
          v-for="(item, index) in logisticsInfo.express_list"
          :title="`【${item.status}】${item.content}`"
          :desc="item.time")
    view.no-title.f-28(v-else) 暂无物流信息
</template>

<script setup>
import { IMG_URL } from "@/config";
import OrderLogistics from "../components/order/logistics.vue";

const logisticsInfo = ref();

onLoad((options) => {
  // getOrderLogistics(options.id);
  logisticsInfo.value = {
    goods_spec_image: IMG_URL + "/goods/img.jpg",
    order_no: "20240002356689",
    express_company: "顺丰快递",
    express_no: "2324552378569",
    express_list: [
      {
        status: "正在派件",
        content: "浙江杭州市西湖区留下街道",
        time: "2024-09-22 15:21:45"
      },
      {
        status: "运输中",
        content: "浙江杭州市萧山区中心",
        time: "2024-09-22 15:21:45"
      },
      {
        status: "运输中",
        content: "北京市大兴区仓库中心",
        time: "2024-09-22 15:21:45"
      },
      {
        status: "已揽件",
        content: "北京海淀区海淀黄庄",
        time: "2024-09-20 12:45:21"
      }
    ]
  };
});

// 查看物流
const getOrderLogistics = (id) => {
  orderApi.orderLogistics({ id }).then((res) => {
    logisticsInfo.value = res.data;
  });
};
</script>

<style lang="scss">
page {
  background-color: #ededed;
}
</style>
<style lang="scss">
.vmall-order-logistics {
  .no-title {
    color: #909193;
  }
  :deep(.u-icon__icon) {
    color: #0052d9 !important;
  }
  :deep(.u-steps-item__content) {
    margin-top: 0rpx !important;
    margin-bottom: 20rpx !important;
  }
  .u-steps-item:nth-child(1) {
    :deep(.u-text__value--content) {
      color: #0052d9 !important;
      font-size: 30rpx !important;
    }
    :deep(.u-text__value--tips) {
      margin-top: 20rpx;
      color: #0052d9 !important;
      font-size: 24rpx !important;
    }
  }
  .u-steps-item:nth-child(2) {
    :deep(.u-text__value--content) {
      color: #0052d9 !important;
      font-size: 30rpx !important;
    }
    :deep(.u-text__value--tips) {
      margin-top: 20rpx;
      color: #0052d9 !important;
      font-size: 24rpx !important;
    }
  }
  .u-steps-item {
    :deep(.u-text__value--content) {
      color: #000000 !important;
      font-size: 30rpx !important;
    }
    :deep(.u-text__value--tips) {
      margin-top: 20rpx;
      color: #909193 !important;
      font-size: 24rpx !important;
    }
  }
  :deep(.u-text__value--main) {
    color: #0052d9 !important;
    font-size: 30rpx !important;
  }
  :deep(.u-text__value--tips) {
    margin-top: 20rpx;
    color: #909193 !important;
    font-size: 24rpx !important;
  }
}
</style>
