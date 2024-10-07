<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-24 11:57:10
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.vmall-address-add
  view.my-24.mx-32
    view.container.pb-32.bg-white.f-28
      view.cell
        view.title.mr-12 联系人
        up-input(
          placeholder="请输入联系人"
          border="surround"
          v-model="form.recipient")
      view.cell
        view.title.mr-12 手机号
        up-input(
          placeholder="请输入手机号"
          border="surround"
          v-model="form.mobile")
      view.cell(@click="onAreaShow")
        view.title.mr-12 地区
        up-input(
          placeholder="请选择地区"
          border="surround"
          v-model="form.provinceCityArea"
          disabled
          style="pointer-events: none;"
          @click="onAreaShow")
      view.cell
        view.title.mr-12 详细地址
        up-textarea(v-model="form.address" placeholder="请输入详细地址" height="35")
  view.btn-fixed.flex.column.justify-center.items-center.px-32.py-20
    view.mb-24(@click="onCheckDefault")
      image.icon-width.mr-20(v-if="form.is_default == 2" :src="AddressXz")
      image.icon-width.mr-20(v-else :src="AddressWxz")
      text.default-tip.f-28 设为默认地址
    view.save-btn.f-32-B.white(@click="onAddEditAddress")
      text 立即保存
  cc-selectDity(
    :province="province"
    :city="city"
    :area="area"
    :show="areaShow"
    @changeClick="changeClick"
    @sureSelectArea="onsetCity"
    @hideShow="areaShow=false")
</template>

<script setup>
import { IMG_URL } from "@/config";

const AddressXz = ref(IMG_URL + "/cart/check-xz.png");
const AddressWxz = ref(IMG_URL + "/cart/check-wxz.png");
const province = ref("北京市");
const city = ref("北京市");
const area = ref("东城区");
const form = ref({
  recipient: "",
  mobile: "",
  province: "",
  city: "",
  county: "",
  provinceCityArea: "",
  address: "",
  is_default: 1, // 2是、1否
  id: ""
});
const areaShow = ref(false);

onLoad((options) => {
  uni.setNavigationBarTitle({
    title: options.id ? "修改地址" : "新增地址"
  });
  // 编辑回显
  if (options.address) {
    const address = JSON.parse(options.address);
    province.value = address.province;
    city.value = address.city;
    area.value = address.county;
    form.value = {
      recipient: address.recipient,
      mobile: address.mobile,
      province: address.province,
      city: address.city,
      county: address.county,
      provinceCityArea: address.province + address.city + address.county,
      address: address.address,
      is_default: address.is_default, // 2是、1否
      id: address.id
    };
  }
});

const onAreaShow = () => {
  areaShow.value = true;
};

const changeClick = (value, value2, value3) => {
  province.value = value;
  city.value = value2;
  area.value = value3;
};

// 选中省市区
const onsetCity = (e) => {
  let data = e.detail.target.dataset;
  let address = data.province + data.city + data.area;
  areaShow.value = false;
  form.value.province = data.province;
  form.value.city = data.city;
  form.value.county = data.area;
  form.value.provinceCityArea = address;
};

// 设为默认地址
const onCheckDefault = () => {
  form.value.is_default = form.value.is_default == 1 ? 2 : 1;
};

// 添加&&编辑收货地址
const onAddEditAddress = () => {
  if (form.value.recipient.trim() == "") {
    uni.showToast({
      title: "请输入联系人",
      icon: "none",
      mask: true
    });
    return;
  }
  if (form.value.mobile.trim() == "") {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
      mask: true
    });
    return;
  }
  if (form.value.provinceCityArea.trim() == "") {
    uni.showToast({
      title: "请选择地区",
      icon: "none",
      mask: true
    });
    return;
  }
  if (form.value.address.trim() == "") {
    uni.showToast({
      title: "请输入详细地址",
      icon: "none",
      mask: true
    });
    return;
  }
  uni.navigateBack();
  // userApi
  //   .addAddress({
  //     province: form.value.province,
  //     city: form.value.city,
  //     county: form.value.county,
  //     address: form.value.address,
  //     recipient: form.value.recipient,
  //     mobile: form.value.mobile,
  //     is_default: form.value.is_default,
  //     id: form.value.id
  //   })
  //   .then((res) => {
  //     if (res.code == 1) {
  //       if (form.value.id) {
  //         uni.showToast({
  //           title: "修改成功",
  //           icon: "success",
  //           mask: true
  //         });
  //       } else {
  //         uni.showToast({
  //           title: "新增成功",
  //           icon: "success",
  //           mask: true
  //         });
  //       }
  //       uni.navigateBack();
  //     }
  //   });
};
</script>

<style lang="scss">
page {
  background-color: #ffffff;
}
</style>
<style lang="stylus" scoped>
.vmall-address-add
  .container
    border-radius: 24rpx;
  .cell
    display: flex;
    align-items: center;
    padding: 20rpx 0rpx;
    border-bottom: 2rpx solid #E6E6E6;
    .title
      width: 120rpx;
  .icon-width
    width: 40rpx;
    height: 40rpx;
    vertical-align: text-top;
  .default-tip
    color: #606266;
    vertical-align: text-top;
  .btn-fixed
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: 0 auto;
    background: #ffffff;
    box-sizing: border-box;
  .save-btn
    width: 100%;
    height: 84rpx;
    line-height: 84rpx;
    background: #fa3504;
    color: #ffffff;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
  :deep(.u-input)
    border: 0;
    background: #ffffff !important;
  :deep(.uni-input-wrapper)
    font-size: 28rpx;
  :deep(.u-textarea)
    border: 0;
  :deep(.uni-textarea-wrapper)
    font-size: 28rpx;
</style>
