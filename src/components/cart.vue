<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-12-13 10:39:44
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
  view.cart-card
    u-swipe-action
      view.mt-20(
        v-for="(item, index) in cartList" 
        :key="index")
        u-swipe-action-item.flex.column(
          :ref="el => { swipeRef[index] = el }"
          :options="operate"
          :index="index"
          :autoClose="true"
          @click="onDelete(index)")
          //- view.cart-name.px-32
          //-   image.shop-img.mr-12(:src="Shop")
          //-   text.f-28-B {{ item.specif }}
          view.cart-box.flex.items-center.px-32
            view.icon-main.mr-20
              image(v-if="item.selected" :src="CheckXz"  @click="onSelect(index)")
              image(v-else :src="CheckWxz" @click="onSelect(index)")
            view.cart-main.flex.flex1.items-center
              view.left_image.mr-20
                image.cart-image(:src="item.url")
              view.left_box.flex1
                view.cart-title.f-32.ellipsis-2 {{ item.title }}
                view.cart-specif.my-10.f-28 {{ item.specif }}
                view.cart-count.flex.justify-between.items-center.mt-10
                  view.flex.items-end
                    text.unit-price.f-24 ￥
                    text.unit-price.f-32.bold {{ item.price }}
                  view
                    text.input.cart-reduce(@click="onMinus(index)") -
                    text.input.cart-text {{ item.quantity }}
                    text.input.cart-add(@click="onAdd(index)") +
  </template>

<script setup>
import Shop from "@/static/shop.png";
const CheckXz = ref("http://cdn.wjaxx.xyz/cart/check-xz.png");
const CheckWxz = ref("http://cdn.wjaxx.xyz/cart/check-wxz.png");

const emit = defineEmits(["delete", "select", "minus", "add"]);
const props = defineProps({
  cartList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

const operate = ref([
  {
    text: "删除",
    style: {
      backgroundColor: "#E84026"
    }
  }
]);
const swipeRef = ref([]);

const onDelete = (id) => {
  emit("delete", id);
};

const onSelect = (index) => {
  emit("select", index);
};

const onMinus = (index) => {
  emit("minus", index);
};

const onAdd = (index) => {
  emit("add", index);
};

// 处理u-swipe-action-item不复位的问题
const resetSwipeAction = () => {
  swipeRef.value[0].closeHandler();
  console.log("是谁", swipeRef.value)
};
defineExpose({ resetSwipeAction });
</script>

<style lang="scss" scoped>
.cart-card {
  .cart-name {
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 2rpx solid #e6e6e6;
    .shop-img {
      width: 40rpx;
      height: 40rpx;
      vertical-align: text-bottom;
    }
  }
  .cart-box {
    height: 252rpx;
    .icon-main {
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
    .cart-main {
      .cart-image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 8px 8px 8px 8px;
      }
      .left_box {
        .cart-title {
          height: 80rpx;
          line-height: 40rpx;
        }
        .cart-specif {
          display: inline-block;
          padding: 4rpx 12rpx;
          background: #999999;
          color: #ffffff;
          font-size: 24rpx;
          height: 36rpx;
          line-height: 36rpx;
          margin-bottom: 10rpx;
          border-radius: 50rpx;
        }
        .cart-count {
          .unit-price {
            color: #fa3534;
          }
          .input {
            display: block;
            text-align: center;
            float: left;
          }
          .cart-reduce {
            width: 44rpx;
            height: 44rpx;
            line-height: 40rpx;
            border-right: none;
            border: 2rpx solid #ededed;
            border-radius: 8rpx 0rpx 0rpx 8rpx;
            font-size: 36rpx;
            color: #cccccc;
          }
          .cart-text {
            width: 44rpx;
            height: 44rpx;
            line-height: 44rpx;
            border-top: 2rpx solid #ededed;
            border-bottom: 2rpx solid #ededed;
            font-size: 28rpx;
          }
          .cart-add {
            width: 44rpx;
            height: 44rpx;
            line-height: 40rpx;
            border-left: none;
            border: 2rpx solid #ededed;
            border-radius: 0rpx 8rpx 8rpx 0rpx;
            font-size: 36rpx;
            color: #cccccc;
          }
        }
      }
    }
  }
}
</style>
