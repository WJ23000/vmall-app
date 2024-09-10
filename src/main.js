import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";
import { pinia } from "./store";
import { BASE_API, IMG_URL } from "./config";

export function createApp() {
	const app = createSSRApp(App);
	app.config.globalProperties.$BASE_API = BASE_API;
  app.config.globalProperties.$IMG_URL = IMG_URL;
  app.use(uviewPlus);
  // uni.$u.config.unit = "rpx"; // uview-plus将单位默认改为rpx
  app.use(pinia);
	return {
		app
	};
}
