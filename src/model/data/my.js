import { IMG_URL } from "@/config";

export const ORDER_GRID_DATA = [
  {
    id: 0,
    name: "待付款",
    image: IMG_URL + "/mine/pay.png",
    count: 0,
    current: 1,
    type: 10
  },
  {
    id: 1,
    name: "待发货",
    image: IMG_URL + "/mine/deliver-goods.png",
    count: 1,
    current: 2,
    type: 20
  },
  {
    id: 2,
    name: "待收货",
    image: IMG_URL + "/mine/the-goods.png",
    count: 2,
    current: 3,
    type: 30
  },
  {
    id: 3,
    name: "待评价",
    image: IMG_URL + "/mine/evaluate.png",
    current: 5,
    type: 51
  },
  {
    id: 4,
    name: "退款/售后",
    image: IMG_URL + "/mine/after-sale.png",
    current: 4,
    type: 50
  }
];

export const FEATURE_GRID_DATA = [
  {
    name: "我的钱包",
    url: "",
    image: IMG_URL + "/mine/wallet.png"
  },
  {
    name: "我的收藏",
    url: "/pagesA/collection/index",
    image: IMG_URL + "/mine/collection.png"
  },
  {
    name: "收货地址",
    url: "/pagesA/address/index",
    image: IMG_URL + "/mine/delivery-address.png"
  },
  {
    name: "生活服务",
    url: "",
    image: IMG_URL + "/mine/life-service.png"
  },
  {
    name: "理财服务",
    url: "",
    image: IMG_URL + "/mine/finance.png"
  },
  {
    name: "优惠券",
    url: "",
    image: IMG_URL + "/mine/coupons.png"
  },
  {
    name: "更多功能",
    url: "",
    image: IMG_URL + "/mine/other.png"
  }
];

export const FEATURE_GRID_DATA2 = [
  {
    name: "联系客服",
    url: "",
    image: IMG_URL + "/mine/customer-service.png"
  },
  {
    name: "车辆服务",
    url: "",
    image: IMG_URL + "/mine/vehicle-service.png"
  },
  {
    name: "美食服务",
    url: "",
    image: IMG_URL + "/mine/food-service.png"
  },
  {
    name: "积分服务",
    url: "",
    image: IMG_URL + "/mine/integral.png"
  },
  {
    name: "帮助中心",
    url: "",
    image: IMG_URL + "/mine/help.png"
  },
  {
    name: "关于",
    url: "",
    image: IMG_URL + "/mine/about.png"
  }
];
