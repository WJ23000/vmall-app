import CryptoJS from "crypto-js";
import { baseApi } from "@/api";
import { getUserInfo, setUserInfo } from "@/service";

let ad = "";
const initAd = () => {
  return new Promise((resolve, reject) => {
    let stimestamp = new Date().getTime();
    // 创建实例(注意实例存在不创建)
    ad = uni.createRewardedVideoAd({
      adUnitId: "hydpzyecyh3e7epqtg"
    });

    // 监听错误
    ad.onError((err) => {
      switch (err.errCode) {
        case 1004:
          // 无合适的广告
          break;
        default:
        // 更多请参考错误码文档
      }
    });

    // 监听视频播放完成
    ad.onClose((data) => {
      if (data.isEnded) {
        console.log("观看成功", data);
        let etimestamp = new Date().getTime();
        let timestampString = stimestamp.toString() + etimestamp.toString();
        let sgin = CryptoJS.MD5(timestampString).toString();
        baseApi
          .adPkNum({
            stimestamp: stimestamp,
            etimestamp: etimestamp,
            sgin: sgin
          })
          .then((res) => {
            let userInfo = getUserInfo();
            userInfo.pk_num = res.data.pk_num;
            setUserInfo(userInfo);
            resolve(1);
          });
        uni.showToast({
          title: `观看了${data.count}个视频`,
          icon: "none"
        });
      } else {
        console.log("未观看完视频");
        uni.showToast({
          title: "未观看完视频",
          icon: "none"
        });
        reject(2);
      }
    });

    // 卸载 close 事件监听
    ad.offClose(closeHandler);

    // 预加载资源
    ad.load();

    handleClick();
  });
};

// 处理用户点击
const handleClick = () => {
  ad.show();
};

// 处理用户点击
const closeHandler = () => {
  console.log("广告关闭");
};

export { initAd };
