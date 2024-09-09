/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-10 18:52:11
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-20 17:56:54
 * @FilePath: \pathology-platform\src\store\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
