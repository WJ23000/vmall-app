<template lang="pug">
view.banner
	u-swiper(
		:list="bannerList",
		keyName="image",
		height="375",
		@change="onSwiperChange"
    @click="onPreviewImage(bannerList, swiperInfo.current)")
	view.indicator
		view {{ swiperInfo.current }}/{{  swiperInfo.total }}
</template>

<script setup>
const props = defineProps({
  bannerList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

const swiperInfo = ref({
  current: 1,
  total: 0
});

onMounted(() => {
  swiperInfo.value.total = props.bannerList.length;
});

const onSwiperChange = (value) => {
  swiperInfo.value.current = value.current + 1;
};

// 预览图片
const onPreviewImage = (imagePaths, index) => {
  let imageList = [];
  imagePaths.forEach((item) => {
    imageList.push(item.image);
  });
  uni.previewImage({
    urls: imageList,
    current: index - 1
  });
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;

  .indicator {
    position: absolute;
    right: 28rpx;
    bottom: 28rpx;
    padding: 8rpx 24rpx;
    background: rgba($color: #000000, $alpha: 0.4);
    color: #ffffff;
    font-size: 24rpx;
    border-radius: 50rpx;
  }
}
</style>
