/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-08-17 20:03:58
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-24 11:41:41
 * @FilePath: \medical-examination\src\config\apis\uploadFile.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
