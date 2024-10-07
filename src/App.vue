<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/* 公共css */
@import "uview-plus/index.scss";
@import url("./styles/index.scss");

/* 这种写法会影响主包大小需注意 */
@for $i from 1 through 100 {
  .f-#{$i} {
    font-size: #{$i}rpx;
  }

  .f-#{$i}-M {
    font-weight: 500;
    font-size: #{$i}rpx;
  }

  .f-#{$i}-B {
    font-weight: bold;
    font-size: #{$i}rpx;
  }

  .px-#{$i} {
    padding-left: #{$i}rpx;
    padding-right: #{$i}rpx;
  }

  .py-#{$i} {
    padding-top: #{$i}rpx;
    padding-bottom: #{$i}rpx;
  }

  .pl-#{$i} {
    padding-left: #{$i}rpx;
  }

  .pr-#{$i} {
    padding-right: #{$i}rpx;
  }

  .pt-#{$i} {
    padding-top: #{$i}rpx;
  }

  .pb-#{$i} {
    padding-bottom: #{$i}rpx;
  }

  .mx-#{$i} {
    margin-left: #{$i}rpx;
    margin-right: #{$i}rpx;
  }

  .my-#{$i} {
    margin-top: #{$i}rpx;
    margin-bottom: #{$i}rpx;
  }

  .ml-#{$i} {
    margin-left: #{$i}rpx;
  }

  .mr-#{$i} {
    margin-right: #{$i}rpx;
  }

  .mt-#{$i} {
    margin-top: #{$i}rpx;
  }

  .mb-#{$i} {
    margin-bottom: #{$i}rpx;
  }

  .w-#{$i} {
    width: #{$i}rpx;
  }

  .h-#{$i} {
    height: #{$i}rpx;
  }

  .line-#{$i} {
    line-height: #{$i}rpx;
  }

  .br-#{$i} {
    border-radius: #{$i}rpx;
  }

  .z-#{$i} {
    z-index: #{$i};
  }
}
</style>
