<template lang="pug">
view.introduce
	view(v-for="(item, index) in introduceList" :key="index")
		video.introduce-video(
			v-if="item.type == 'video'", 
			:src="item.url")
		div.introduce-image(
			v-if="item.type == 'image'", 
			:style="{backgroundImage: 'url(' + item.url + ')', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}")
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
    z-index: 0;
  }
  &-image {
    width: 100%;
    height: 13532rpx;
    background-position: left top;
  }
}
</style>
