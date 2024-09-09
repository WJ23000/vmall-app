/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-11-15 13:54:16
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2023-11-24 17:29:35
 * @FilePath: \product-compare\src\service\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { validatePhone } from "./base-service/validateRule";
import {
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  getInvitationCode,
  setInvitationCode,
  removeInvitationCode,
  getPosterFilePath,
  setPosterFilePath,
  removePosterFilePath
} from "./base-service/userInfo";

export {
  validatePhone,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  getInvitationCode,
  setInvitationCode,
  removeInvitationCode,
  getPosterFilePath,
  setPosterFilePath,
  removePosterFilePath
};
