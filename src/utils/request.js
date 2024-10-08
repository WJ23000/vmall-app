import { BASE_API } from "@/config";
import { setStorage } from "@/utils/storage";
import { getUserInfo, removeUserInfo } from "@/service";

let requestTree = {};

function message(data) {
  const { code, msg } = data;
  switch (code) {
    case 0:
      uni.showToast({
        title: msg,
        icon: "none",
        duration: 1000
      });
      break;
    default:
      uni.showToast({
        title: msg,
        icon: "none",
        duration: 1000
      });
      break;
  }
}

// 终止所有发送中的请求
function abortRequest() {
  for (const name in requestTree) requestTree[name].abort();
  requestTree = {};
}

function baseRequest(method, url, data = {}, baseUrl) {
  // 获取用户登录信息
  const userInfo = getUserInfo();

  return new Promise((resolve) => {
    const header = {
      "content-type": "application/json; charset=utf-8"
    };
    header.token = userInfo.token;
    let responseData;
    requestTree[url] = uni.request({
      url: baseUrl ? baseUrl + url : BASE_API + url,
      method,
      timeout: 20000,
      header,
      data,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          // 正常返回
          if (res.data.code == 0) {
            message(res.data);
          } else {
            responseData = res.data;
          }
        } else if (res.data.code === 401) {
          abortRequest();
          // 删除用户登录信息
          removeUserInfo();
          // 存储当前页面(用于登录成功后返回)
          const pages = getCurrentPages();
          const page = pages[pages.length - 1].$page.fullPath;
          setStorage("back_to_page", decodeURIComponent(page));
          uni.reLaunch({
            url: "/pages/user/login"
          });
        } else {
          message(res.data);
        }
      },
      fail: (res) => {
        message(res.data);
      },
      complete: () => {
        delete requestTree[url];
        // 正常返回
        resolve(responseData);
        if (!responseData) return;
      }
    });
  });
}

const request = {
  get: (api, params, baseUrl) => baseRequest("GET", api, { ...params }, baseUrl),
  post: (api, params, baseUrl) => baseRequest("POST", api, { ...params }, baseUrl),
  delete: (api, params, baseUrl) => baseRequest("DELETE", api, { ...params }, baseUrl)
};

export default request;
