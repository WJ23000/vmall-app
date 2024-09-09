/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-11-19 19:08:16
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-21 10:29:00
 * @FilePath: \product-compare\src\utils\createPoster.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { setPosterFilePath } from "@/service";
// 绘制海报
const createPoster = (data) => {
  uni.showLoading({
    title: "海报绘制中…",
    mask: true
  });
  // 获取 Canvas 组件的上下文对象
  const ctx = uni.createCanvasContext("myCanvas");

  // 非圆角矩形
  // rect(ctx, 0, 0, 343, 557);
  // 圆角矩形
  roundedRect(ctx, 0, 0, 343, 557, 12, "#ffffff");

  // 店铺名称
  // ctx.setFontSize(16);
  ctx.font = "normal bold 15px arial,sans-serif";
  ctx.setFillStyle("#000000");
  ctx.fillText(data.storeName, 16, 463);
  ctx.setFillStyle("black");

  // 商品名称
  // ctx.setFontSize(18);
  ctx.font = "normal 11px arial,sans-serif";
  ctx.setFillStyle("#888888");
  ctx.fillText(data.shopName, 16, 480);

  // 商品价格
  // ctx.setFontSize(18);
  ctx.font = "normal 11px arial,sans-serif";
  ctx.setFontSize;
  ctx.setFillStyle("#888888");
  ctx.fillText(data.price, 16, 498);

  // 必须延迟执行 不然H5和APP不显示
  setTimeout(() => {
    // 封面图
    ctx.drawImage(data.cover, 0, 0, 331, 404);
    // 小程序二维码
    ctx.drawImage(data.qrCode, 258, 446, 56, 56);
    ctx.draw(false, () => {
      uni.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 343,
        height: 557,
        canvasId: "myCanvas",
        success: function (res) {
          uni.hideLoading();
          uni.showToast({
            icon: "success",
            mask: true,
            title: "绘制完成"
          });
          const tempFilePath = res.tempFilePath;
          // 海报本地图片地址存储到缓存
          setPosterFilePath(tempFilePath);
        },
        fail: function (res) {
          console.log(res);
          uni.showToast({
            icon: "error",
            title: "海报生成失败！"
          });
        }
      });
    });
  }, 0);
};

// 清空画布
const clearPoster = () => {
  // 获取 Canvas 组件的上下文对象
  const ctx = uni.createCanvasContext("myCanvas");

  ctx.clearRect(0, 0, 343, 557);
  ctx.draw(true);
};

// 绘制非圆角矩形
const rect = (ctx, x, y, width, height) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.setFillStyle("#ffffff");
  ctx.fill();
};

// 绘制圆角矩形
const roundedRect = (ctx, x, y, width, height, radius, color) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); // 右上圆角
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // 右下圆角
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); // 左下圆角
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y); // 左上圆角
  ctx.setFillStyle(color);
  ctx.fill();
};

export { createPoster, clearPoster };
