<template lang="pug">
view.slide-grid
	u-scroll-list(indicatorColor="#fff0f0", indicatorActiveColor="#fa3534")
		view.scroll-list
			view.scroll-list__line(
				v-for="(item, index) in gridList"
				:key="index")
				view.scroll-list__line__item(
					v-for="(record, index1) in item"
					:key="index1"
					:class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']")
					image.scroll-list__line__item__image(:src="record.image"
					@click="onGridClick(record)")
					text.scroll-list__line__item__text {{ record.name }}
</template>

<script setup>
const props = defineProps({
  gridList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

const onGridClick = (item) => {
  console.log("点击", item);
};
</script>

<style lang="scss" scoped>
.slide-grid {
	background: #ffffff;
	border-radius: 8rpx;
  .scroll-list {
    @include flex(column);

    &__goods-item {
      margin-right: 40rpx;

      &__image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 8rpx;
      }

      &__text {
        color: #fa3534;
        text-align: center;
        font-size: 24rpx;
        margin-top: 10rpx;
      }
    }

    &__show-more {
      background-color: #fff0f0;
      border-radius: 6rpx;
      padding: 6rpx 12rpx;
      @include flex(column);
      align-items: center;

      &__text {
        font-size: 24rpx;
        width: 24rpx;
        color: #fa3534;
        line-height: 32rpx;
      }
    }

    &__line {
      @include flex;
      margin-top: 20rpx;
      text-align: center;

      &__item {
        margin-left: 47rpx;
        width: 120rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__image {
          width: 100rpx;
          height: 100rpx;
        }

        &__text {
          margin-top: 10rpx;
          color: $u-content-color;
          font-size: 24rpx;
          text-align: center;
        }

        &--no-margin-right {
          margin-right: 0;
        }
      }

      &__item:nth-child(6) {
        margin-right: 47rpx;
      }
    }
  }
}
</style>
