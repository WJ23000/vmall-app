/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-22 14:16:14
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-20 15:15:22
 * @FilePath: \app-formwork\src\config\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 获取本地储存内容
 * @param storageName String (需要获取的名字)
 */
const getStorage = function (storageName) {
  const item = uni.getStorageSync(storageName);
  if (item && item != "null") {
    if (/{|\[/.test(uni.getStorageSync(storageName))) {
      return JSON.parse(uni.getStorageSync(storageName));
    } else {
      return uni.getStorageSync(storageName);
    }
  } else {
    return false;
  }
};

/**
 * 储存到本地储存
 * @param storageName String (本地储存名称)
 * @param params Object (需要储存的数据)
 */
const setStorage = function (storageName, params) {
  let str;
  // 判断params是否为字符串
  if (Object.prototype.toString.call(params) === "[object String]") {
    str = params;
  } else {
    str = JSON.stringify(params);
  }
  uni.setStorageSync(storageName, str);
};

/**
 * 删除本地储存内容
 * @param storageName String (需要获取的名字)
 */
const removeStorage = function (storageName) {
  uni.removeStorageSync(storageName);
};
export { getStorage, setStorage, removeStorage };
