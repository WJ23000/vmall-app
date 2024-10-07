<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-26 14:53:51
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.vmall-address
  view.container(v-if="addressList.length > 0")
    view.list.mt-20.mx-20.px-20.py-20(v-for="(item, index) in addressList" :key="index" @click.stop="onCheckAddress(item)")
      view.cell.pb-20
        view.flex.justify-between.mb-16.f-28-B
          text {{ item.recipient }}
          text {{ item.mobile }}
        view.f-24
          text {{ item.province }}
          text {{ item.city }}
          text {{ item.county }}
          text {{ item.address }}
      view.flex.justify-between.mt-20.f-28
        view.flex.items-center(@click.stop.stop="onAddressDefault(item)")
          image.icon-width.mr-20(v-if="item.is_default == 2" :src="AddressXz")
          image.icon-width.mr-20(v-else :src="AddressWxz")
          text 默认地址
        view.flex.flex1.justify-end
          view.flex.items-center.justify-center.mr-28(@click.stop="onAddressEdit(item)")
            up-icon.mr-8(name="edit-pen" color="#fa3534" size="21")
            text 修改
          view.flex.items-center.justify-end(@click.stop="onAddressDelete(item, index)")
            up-icon.mr-8(name="trash" color="#fa3534" size="20")
            text 删除
  //- 暂无数据
  view.empty-container.flex.justify-center.items-center(v-else)
    Empty(:emptyInfo="emptyInfo")
  view.btn-fixed.flex.justify-center.px-32.py-20
    view.save-btn.flex.justify-center.f-32-B.white(@click.stop="onAddressAdd")
      up-icon.mr-10(name="plus" color="##ffffff" size="20")
      text 添加地址
</template>

<script setup>
import { IMG_URL } from "@/config";
import Empty from "@/components/empty.vue";
import { ADDRESS_DATA } from "@/model";

const AddressXz = ref(IMG_URL + "/cart/check-xz.png");
const AddressWxz = ref(IMG_URL + "/cart/check-wxz.png");
const EmptyImage = ref(IMG_URL + "/empty/normal.png");
const addressList = ref([]);
const pageParam = ref({
  page: 1,
  page_size: 10
});
const total = ref();
const emptyInfo = ref({
  image: EmptyImage,
  width: 300,
  height: 300,
  tip: "还没有添加地址哦，快来添加吧~"
});
const type = ref();

onLoad((options) => {
  type.value = options.type;
});

onShow(() => {
  initList();
  addressList.value = JSON.parse(JSON.stringify(ADDRESS_DATA));
});

// 选择收货地址
const onCheckAddress = (item) => {
  if (type.value) {
    uni.$emit("check-address", item);
    uni.navigateBack();
  }
};

// 初始化请求数据
const initList = () => {
  // pageParam.value.page = 1;
  // addressList.value = [];
  // getAddressList();
};

// 获取收货地址列表
const getAddressList = () => {
  userApi.addressList(pageParam.value).then((res) => {
    total.value = res.data.total;
    let list = res.data.data;
    if (list.length > 0) {
      addressList.value = addressList.value.concat(list);
    }
  });
};

// 修改默认地址
const onAddressDefault = (item) => {
  addressList.value.forEach((item) => {
    item.is_default = false;
  });
  item.is_default = 2;
  // userApi
  //   .setAddressDefault({
  //     id: item.id
  //   })
  //   .then((res) => {
  //     if (res.code == 1) {
  //       uni.showToast({
  //         title: "设置成功",
  //         icon: "success",
  //         mask: true
  //       });
  //       initList();
  //     }
  //   });
};
// 添加地址
const onAddressAdd = () => {
  uni.navigateTo({ url: "/pagesA/address/add" });
};
// 编辑地址
const onAddressEdit = (item) => {
  uni.navigateTo({ url: "/pagesA/address/add?id=" + item.id + "&address=" + JSON.stringify(item) });
};
// 删除地址
const onAddressDelete = (item, index) => {
  addressList.value.splice(index, 1);
  // userApi
  //   .deleteAddress({
  //     id: item.id
  //   })
  //   .then((res) => {
  //     if (res.code == 1) {
  //       uni.showToast({
  //         title: "删除成功",
  //         icon: "success",
  //         mask: true
  //       });
  //       initList();
  //     }
  //   });
};

// 触底加载
onReachBottom(() => {
  if (addressList.value.length < total.value) {
    pageParam.value.page++;
    initList();
  }
});

// 下拉刷新
onPullDownRefresh(() => {
  addressList.value = JSON.parse(JSON.stringify(ADDRESS_DATA));
  uni.stopPullDownRefresh();
});
</script>

<style lang="scss">
page {
  background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.vmall-address {
  .container {
    padding-bottom: 150rpx;
  }
  .list {
    background: #ffffff;
    border-radius: 12px;
    .cell {
      border-bottom: 2rpx solid #e6e6e6;
    }
  }
  .icon-width {
    width: 40rpx;
    height: 40rpx;
    vertical-align: text-top;
  }
  .empty-container {
    background: #ffffff;
    height: calc(100vh - 84rpx);
  }
  .btn-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: 0 auto;
    background: #ffffff;
    box-sizing: border-box;
  }
  .save-btn {
    width: 100%;
    height: 84rpx;
    line-height: 84rpx;
    background: #fa3504;
    color: #ffffff;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
  }
}
</style>
