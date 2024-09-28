/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2024-04-15 09:07:31
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-04-18 11:00:54
 * @FilePath: \testament-web\src\utils\download.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 下载文件(流文件)
const downloadFileBlob = (res, filename) => {
  const href = window.URL.createObjectURL(res);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  //
  document.body.removeChild(a);
};

// 下载文件(url地址)
const downloadFileUrl = (res, filename) => {
  const href = res;
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = href;
  a.download = filename;
  a.target = "_self"; // 本地窗口打开链接
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// 下载文件(url地址)新窗口
const downloadFileUrlNew = (res, filename) => {
  const href = res;
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = href;
  a.download = filename;
  a.target = "_blank"; // 新窗口打开链接
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export { downloadFileBlob, downloadFileUrl, downloadFileUrlNew };
