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
