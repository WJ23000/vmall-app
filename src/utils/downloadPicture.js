/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-11-19 15:57:21
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-19 16:55:45
 * @FilePath: \vmall-app\src\utils\downloadPicture.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 图片地址域名必须配置过小程序白名单
// 微信：scope.writePhotosAlbum
// 抖音：scope.album
const downloadPicture = (url) => {
  // 相册权限校验
  uni.getSetting({
    success(res) {
      if (!res.authSetting["scope.album"]) {
        // 抖音平台触发该方法用于激活相册权限
        // #ifdef MP-TOUTIAO
        savePictureAlbum(url);
        // #endif
        uni.authorize({
          scope: "scope.album",
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
      if (res.authSetting["scope.album"]) {
        console.log("授权成功", res);
        uni.showToast({
          title: "授权成功",
          icon: "success",
          mask: true
        });
      } else {
        console.log("授权失败", res);
        uni.showToast({
          title: "授权失败",
          icon: "fail",
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
            icon: "fail",
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
