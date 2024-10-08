import { BASE_API } from "@/config";
import { getUserInfo } from "@/service";

function uploadFile(filePath) {
  const userInfo = getUserInfo();
  uni.showLoading({
    title: "正在上传...",
    icon: "loading"
  });
  return new Promise(function (resolve, reject) {
    uni.uploadFile({
      url: `${BASE_API}/common/upload`,
      filePath,
      name: "file",
      header: {
        token: userInfo.token
      },
      success: (res) => {
        uni.hideLoading();
        uni.showToast({
          title: "上传成功",
          icon: "success",
          mask: true
        });
        resolve(JSON.parse(res.data).data.url);
      },
      fail: (err) => {
        uni.hideLoading();
        uni.showToast({
          title: "上传失败",
          icon: "error",
          mask: true
        });
        reject(err);
      }
    });
  });
}

export default uploadFile;
