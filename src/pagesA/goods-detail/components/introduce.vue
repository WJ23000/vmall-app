<template lang="pug">
view.introduce
  view(v-for="(item, index) in introduceList" :key="index")
    video.introduce-video(
      v-if="item.type == 'video'", 
      :src="item.url")
    mp-html(v-if="item.type == 'image'", :content="item.url")
</template>

<script setup>
const props = defineProps({
  introduceList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
</script>

<style lang="scss" scoped>
.introduce {
  &-video {
    display: flex;
    width: 100%;
    z-index: 1;
  }
  &-image {
    width: 100%;
    height: 100%;
    background-position: left top;
  }
}
</style>
