// 全局分享
const shareService = {
  onShareAppMessage: function () {
    return {
      title: "有球一下",
      desc: "专为台球爱好者设计的台球杆比对小程序，帮助用户轻松快速地选择最合适的球杆。拥有首创的比对功能，解决选购难题。"
    };
  }
};

export default shareService;
