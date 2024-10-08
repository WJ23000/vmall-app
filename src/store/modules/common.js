import { defineStore } from "pinia";

const commonStore = defineStore("common", {
  state: () => ({
    pkFirstGroup: {},
    pkTwoGroup: {},
    ad: {},
    adStimestamp: "",
    adFn: () => {}
  }),

  getters: {},

  actions: {
    // 单个修改
    singleEditState(value) {
      this.pkFirstGroup = value;
    },
    // 批量修改
    patchEditState(value) {
      this.$patch((state) => {
        state.pkFirstGroup = value;
      });
    }
  },
  persist: {
    enabled: true, // 是否开启持久化
    H5Storage: window?.localStorage, // H5端以localStorage方式持久化
    detached: true // 设置订阅与组件分离(组件被卸载，持久化存储依然保留)
  }
});

export { commonStore };
