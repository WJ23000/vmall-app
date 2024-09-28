/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-11-19 19:08:16
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-29 14:22:36
 * @FilePath: \aesthetic-medicine\src\utils\createPoster.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { setPosterFilePath } from "@/service";
// 绘制海报
const createPoster = (data) => {
  // 获取 Canvas 组件的上下文对象
  const ctx = uni.createCanvasContext("myCanvas");

  // 非圆角矩形
  // rect(ctx, 0, 0, 304, 412);
  // 圆角矩形
  roundedRect(ctx, 0, 0, 304, 412, 12, "#ffffff");

  // 店铺名称
  // ctx.setFontSize(16);
  ctx.font = "normal bold 16px arial,sans-serif";
  ctx.setFillStyle("#000000");
  ctx.fillText(data.storeName, 40, 326);
  ctx.setFillStyle("black");

  // 商品名称
  // ctx.setFontSize(18);
  ctx.font = "normal bold 18px arial,sans-serif";
  ctx.fillText(data.shopName, 12, 362);

  // 商品价格
  // ctx.setFontSize(18);
  ctx.font = "normal bold 18px arial,sans-serif";
  ctx.setFontSize;
  ctx.setFillStyle("#E84026");
  ctx.fillText(data.price, 12, 394);

  // 必须延迟执行 不然H5和APP不显示
  setTimeout(() => {
    // 商品封面
    ctx.drawImage(data.cover, 12, 12, 280, 280);
    // 店铺logo
    ctx.drawImage(data.storeLogo, 12, 310, 22, 22);
    // 小程序二维码
    ctx.drawImage(data.qrCode, 231, 338, 60, 60);
    ctx.draw(false, () => {
      setTimeout(() => {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 304,
          height: 412,
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
      }, 200);
    });
  }, 0);
};

// 清空画布
const clearPoster = () => {
  // 获取 Canvas 组件的上下文对象
  const ctx = uni.createCanvasContext("myCanvas");

  ctx.clearRect(0, 0, 304, 412);
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
