<template lang="pug">
view.recommend
	swiper.swiper(
		:indicator-dots="true",
		indicator-active-color="#fa3534",
		:circular="true")
		swiper-item
			u-grid(col="3")
				u-grid-item(
					:customStyle="{padding:12+'rpx'}"
					v-for="(item, index) in oneList",
					:index="index",
					:key="index")
						image.grid-image(:src="item.url")
						text.grid-text {{ item.title }}
						text.grid-money ￥{{ item.price }}
		swiper-item
			u-grid(col="3")
				u-grid-item(
					:customStyle="{padding:12+'rpx'}"
					v-for="(record, index) in twoList",
					:index="index",
					:key="index")
						image.grid-image(:src="record.url")
						text.grid-text {{ record.title }}
						text.grid-money ￥{{ record.price }}
</template>

<script setup>
const props = defineProps({
  recommendList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

const oneList = ref([]);
const twoList = ref([]);

onMounted(() => {
  oneList.value = props.recommendList.slice(0, 6);
  twoList.value = props.recommendList.slice(6, 10);
});
</script>

<style lang="scss" scoped>
.recommend {
  .swiper {
    height: 720rpx;
  }
  .grid-image {
    width: 190rpx;
    height: 190rpx;
  }
  .grid-text {
    margin-top: 8rpx;
    font-size: 26rpx;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .grid-money {
    margin-top: 8rpx;
    font-size: 26rpx;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    color: #fa3534;
  }
}
</style>
