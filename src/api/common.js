import request from "@/utils/request";

export const commonApi = {
  // 发送短信
  sendSms: (params) => request.post("/sms/send", params),
  // 用户协议
  agreement: (params) => request.get("/index/user_agreement", params),
  // 隐私政策
  privacy: (params) => request.get("/index/user_privacy", params)
}
