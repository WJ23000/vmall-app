<template lang="pug">
view.vmall-feedback
  view.my-24.mx-32
    view.container.pb-32.bg-white.f-28
      view.cell
        view.title.mr-12 问题
        up-input(
          placeholder="请输入问题"
          border="surround"
          v-model="form.reason")
      view.cell
        view.title.mr-12 问题描述
        up-textarea(v-model="form.describe" placeholder="您填写的越详细，问题越容易解决哦~" height="35")
      view.cell
        view.title.mr-12 手机号
        up-input(
          placeholder="请输入手机号"
          border="surround"
          v-model="form.mobile")
  view.btn-fixed.flex.column.justify-center.items-center.px-32.py-20
    view.save-btn.f-32-B.white(@click="onSubmitFeedback")
      text 提交
</template>

<script setup>
const form = ref({
  reason: "",
  describe: "",
  mobile: ""
});

// 提交意见反馈
const onSubmitFeedback = () => {
  if (form.value.reason.trim() == "") {
    uni.showToast({
      title: "请输入问题",
      icon: "none",
      mask: true
    });
    return;
  }
  if (form.value.describe.trim() == "") {
    uni.showToast({
      title: "请输入问题描述",
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
.vmall-feedback
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
