import { resolve } from "node:path";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import ViteComponents from "unplugin-vue-components/vite";
import { BASE_API } from "./src/config";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {},
  plugins: [
    uni(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        "vue",
        "uni-app",
        "pinia",
        {
          "@/config/helper/pinia-auto-refs": ["useStore"],
        },
        {
          "@/config/helper/store-persist": ["storePersist"],
        },
      ],
    }),
    // https://github.com/antfu/unplugin-vue-components
    ViteComponents({
      dirs: ["src/components"],
      extensions: ["vue"],
    }),
  ],
  server: {
    open: false, // 自动打开
    base: "./ ", // 生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用nginx转发
      "^/api": {
        target: BASE_API, // 后端服务实际地址
        changeOrigin: true, // 开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
