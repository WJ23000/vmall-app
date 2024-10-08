import request from "@/utils/request";

export const loginApi = {
  // 获取小程序授权信息
  douyinAuth: (params) => request.post("/user/douyinauth", params),
  // 抖音授权登录
  douyinLogin: (params) => request.post("/user/douyinlogin", params),
  // 手机号验证码登录
  mobileLogin: (params) => request.post("/user/mobilelogin", params),
  // 退出登录
  exitLogin: (params) => request.post("/user/logout", params),
  // 获取用户信息
  getUserProfile: (params) => request.get("/user/profile", params)
};
