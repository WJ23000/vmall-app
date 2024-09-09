let stateBarHeight = ref(0);
let headerHeight = ref(50);
let windowWidth = ref(0);

const getStateBarHeight = () => {
  let info = uni.getSystemInfoSync();
  stateBarHeight = info.statusBarHeight;
  windowWidth = info.windowWidth;
  return stateBarHeight;
};
const getMenuButtonInfo = () => {
  // #ifdef MP-WEIXIN
  let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  let paddingSize = menuButtonInfo.top - stateBarHeight;
  headerHeight = menuButtonInfo.bottom - stateBarHeight + paddingSize;
  windowWidth = menuButtonInfo.left - 24;
  // #endif
  return {
    headerHeight,
    windowWidth
  }
};

export { getStateBarHeight, getMenuButtonInfo };
