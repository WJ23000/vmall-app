<!--
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 13:13:43
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-23 13:37:38
 * @FilePath: \app-formwork\src\pages\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template lang="pug">
view.empty.flex.column.justify-center.items-center
  image(:src="emptyInfo.image" :style="{ width: emptyInfo.width + 'rpx', height: emptyInfo.height + 'rpx'}")
  view.tip.mt-20.f-28 {{ emptyInfo.tip }}
</template>

<script setup>
const props = defineProps({
  emptyInfo: {
    type: Function,
    default: () => {
      return {
        image: "",
        tip: "",
        width: 400,
        height: 400
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.empty {
  background: #ffffff;
  width: 100vw;
  .tip {
    color: #909193;
  }
}
</style>
