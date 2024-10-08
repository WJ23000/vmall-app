import { STORAGE_CONFIG } from "@/model";
import { getStorage, setStorage, removeStorage } from "@/utils/storage";

// 用户信息
function getUserInfo() {
  return getStorage(STORAGE_CONFIG.USER_INFO);
}

function setUserInfo(userInfo) {
  return setStorage(STORAGE_CONFIG.USER_INFO, userInfo);
}

function removeUserInfo() {
  return removeStorage(STORAGE_CONFIG.USER_INFO);
}

// 邀请码
function getInvitationCode() {
  return getStorage(STORAGE_CONFIG.InvitationCode);
}

function setInvitationCode(invitationCode) {
  return setStorage(STORAGE_CONFIG.InvitationCode, invitationCode);
}

function removeInvitationCode() {
  return removeStorage(STORAGE_CONFIG.InvitationCode);
}

// 海报本地图片地址
function getPosterFilePath() {
  return getStorage(STORAGE_CONFIG.PosterFilePath);
}

function setPosterFilePath(posterFilePath) {
  return setStorage(STORAGE_CONFIG.PosterFilePath, posterFilePath);
}

function removePosterFilePath() {
  return removeStorage(STORAGE_CONFIG.PosterFilePath);
}

export {
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
