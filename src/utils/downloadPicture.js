import { downloadFileUrl } from "./download";

// 图片地址域名必须配置过小程序白名单
const downloadPicture = (url) => {
  // #ifdef H5
  downloadFileUrl(url, "poster.png");
  return;
  // #endif
  // #ifdef APP-PLUS
  savePictureAlbum(url);
  return;
  // #endif
  // 相册权限校验
  uni.getSetting({
    success(res) {
      if (!res.authSetting["scope.writePhotosAlbum"]) {
        uni.authorize({
          scope: "scope.writePhotosAlbum",
          success(res) {
            console.log(res, "同意授权");
            savePictureAlbum(url);
          },
          fail(err) {
            console.log(err, "拒绝授权");
            uni.showModal({
              title: "提示",
              content: "检测到您没有授权保存图片到相册，为了更好的体验，请前往设置授权",
              success: function (res) {
                if (res.confirm) {
                  openSetting();
                } else if (res.cancel) {
                  console.log("用户点击取消");
                }
              }
            });
          }
        });
      } else {
        console.log("已经授权");
        savePictureAlbum(url);
      }
    }
  });
};
// 打开相册权限授权
const openSetting = () => {
  uni.openSetting({
    success: (res) => {
      console.log("调用成功", res);
      if (res.authSetting["scope.writePhotosAlbum"]) {
        uni.showToast({
          title: "授权成功",
          icon: "success",
          mask: true
        });
      } else {
        uni.showToast({
          title: "授权失败",
          icon: "error",
          mask: true
        });
      }
    },
    fail: (err) => {
      console.log("调用失败", err);
    }
  });
};
// 保存到相册
const savePictureAlbum = (url) => {
  uni.showLoading({
    title: "保存中...",
    icon: "loading"
  });
  // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
  uni.getImageInfo({
    src: url,
    success: function (image) {
      console.log(image);
      uni.saveImageToPhotosAlbum({
        filePath: image.path,
        success(res) {
          uni.hideLoading();
          uni.showToast({
            title: "图片已保存到相册",
            icon: "success",
            mask: true
          });
        },
        fail(err) {
          uni.hideLoading();
          uni.showToast({
            title: "保存失败，请稍后重试！",
            icon: "error",
            mask: true
          });
          console.log(err);
        }
      });
    },
    fail(err) {
      console.log(err);
    }
  });
};

export default downloadPicture;
