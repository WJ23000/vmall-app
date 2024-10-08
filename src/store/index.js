import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";
import { commonStore } from "@/store/modules/common";

const pinia = createPinia();
pinia.use(piniaPersist);

export default pinia;

export { pinia, commonStore };
