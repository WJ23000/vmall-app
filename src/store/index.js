/*
 * @Author: 汪军 624473119@qq.com
 * @Date: 2023-10-10 18:51:54
 * @LastEditors: 汪军 624473119@qq.com
 * @LastEditTime: 2024-03-08 15:35:13
 * @FilePath: \pathology-platform\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";
import { commonStore } from "@/store/modules/common";

const pinia = createPinia();
pinia.use(piniaPersist);

export default pinia;

export { pinia, commonStore };
