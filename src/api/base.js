import request from "@/utils/request";

export const baseApi = {
  // 获取轮播图
  bannerList: (params) => request.get("/index/banner", params),
  // 获取官方信息
  contactInfo: (params) => request.get("/index/contact", params),
  // 收藏/取消收藏
  collection: (params) => request.post("/collection/op", params),
  // 添加/删除商品到商品池
  pool: (params) => request.post("/pool/op", params),
  // 获取对比池中商品数量
  poolNum: (params) => request.get("/pool/num", params),
  // 获取商品详情
  goodsDetail: (params) => request.post("/goods/detail", params),
  // 获取品牌、系列、型号分类
  goodsCategory: (params) => request.get("/goods/cate", params),
  // 收藏列表
  collectionList: (params) => request.get("/collection/index", params),
  // 看广告奖励PK数量
  adPkNum: (params) => request.post("/user/incr_pk_num", params),
  // 商品列表页下拉参数
  goodsSelect: (params) => request.get("/goods/params", params),
  // 商品列表&&增选商品列表
  goodsList: (params) => request.post("/goods/index", params),
  // 获取对比商品信息
  goodsPk: (params) => request.post("/goods/pk", params),
  // 对比历史列表
  historyList: (params) => request.post("/history/index", params),
  // 删除对比历史
  deleteHistory: (params) => request.post("/history/del", params)
};
