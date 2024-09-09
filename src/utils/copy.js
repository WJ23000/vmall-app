/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 18:29:42
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-28 09:34:58
 * @FilePath: \app-formwork\src\utils\copy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
