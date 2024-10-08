// 复制内容到剪贴板
const copyContent = (data) => {
  uni.setClipboardData({
    data,
    success: function () {
      uni.showToast({
        title: "复制成功",
        icon: "success",
        mask: true
      });
    }
  });
};

export default copyContent;
