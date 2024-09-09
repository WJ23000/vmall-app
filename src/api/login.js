/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 14:16:14
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-11 11:03:54
 * @FilePath: \app-formwork\src\config\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
