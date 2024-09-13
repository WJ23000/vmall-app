<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-24 09:27:55
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.order-logistics
  view.my-24
    OrderLogistics(:item="logisticsInfo")
  view.px-32.py-32.bg-white
    view.mb-40 物流详情
    u-line(color="#EEEEEE")
    view.info.mt-30(v-if="logisticsInfo.express_list.length > 0")
      u-steps(current="1" direction="column" activeColor="#0052D9")
        u-steps-item(
          v-for="(item, index) in logisticsInfo.express_list"
          :title="`【${item.status}】${item.context}`"
          :desc="item.time")
    view.no-title.f-28(v-else) 暂无物流信息
</template>

<script setup>
import OrderLogistics from "@/components/order/logistics.vue";
import { orderApi } from "@/api";

const logisticsInfo = ref();

onLoad((options) => {
  getOrderLogistics(options.id);
});

// 查看物流
const getOrderLogistics = (id) => {
  orderApi.orderLogistics({id}).then((res) => {
    logisticsInfo.value = res.data
  });
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
</style>
<style lang="stylus">
.order-logistics
  .no-title
    color: #909193;
  :deep(.u-icon__icon)
    color: #0052D9 !important;
  .u-steps-item:nth-child(1)
    :deep(.u-text__value--content)
      color: #0052D9 !important;
      font-size: 30rpx  !important;
    :deep(.u-text__value--tips)
      margin-top: 20rpx;
      color: #0052D9 !important;
      font-size: 24rpx !important;
  .u-steps-item:nth-child(2)
    :deep(.u-text__value--content)
      color: #0052D9 !important;
      font-size: 30rpx !important;
    :deep(.u-text__value--tips)
      margin-top: 20rpx;
      color: #0052D9 !important;
      font-size: 24rpx !important;
  .u-steps-item
    :deep(.u-text__value--content)
      color: #000000 !important;
      font-size: 30rpx  !important;
    :deep(.u-text__value--tips)
      margin-top: 20rpx;
      color: #909193 !important;
      font-size: 24rpx !important;
  :deep(.u-text__value--main)
    color: #0052D9 !important;
    font-size: 30rpx !important;
  :deep(.u-text__value--tips)
    margin-top: 20rpx;
    color: #909193 !important;
    font-size: 24rpx !important;
</style>
