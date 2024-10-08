#  vmall-app

## 简介
基于 vue3 和 uniapp 搭建的模版，用于快速开发

## 最新打包版本
1.0.0
100

## 所用技术栈

- 依赖管理：node v16.x 以上, 如果你已经使用 nvm，可以参考[Github: nvm](https://github.com/nvm-sh/nvm#deeper-shell-integration)来实现 node 版本的自动切换
- 小程序框架： [uni-app](https://uniapp.dcloud.io/)
- 构建工具： [Vite](https://vitejs.dev/)
- 前端框架： [Vue3.x](https://v3.cn.vuejs.org/)
- 前端UI框架： [uview-plus](https://ijry.github.io/uview-plus/)
- 代码规范：
  - [ESLint](https://eslint.org/)
  - [Prettier](https://www.prettier.cn/)
  - [Stylelint](https://stylelint.io/)
- css 预处理器： [scss](https://sass-lang.com/)
- 状态管理工具：[pinia](https://pinia.vuejs.org/)
- pinia 数据持久化插件：[pinia-plugin-persist-uni](https://allen-1998.github.io/pinia-plugin-persist-uni/)
- vite 插件：
  - [pinia-auto-refs](https://github.com/Allen-1998/pinia-auto-refs)
  - [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
  - [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

## TODO
- 提交规范：
  - [husky](https://typicode.github.io/husky/#/)
  - npm i husky -D
  - npx husky install
  - npx husky add .husky/pre-commit
  - [commitlint](https://commitlint.js.org/#/)
  - 全局安装：npm install commitizen -g
  - 项目内初始化：commitizen init cz-conventional-changelog --save --save-exact --force
  - [lint-staged](https://www.npmjs.com/package/lint-staged)
- 版本检测

## 工程目录

```shell
.
├── .hbuilderx hbuilderx编译器配置文件
├── .vscode
│   ├── extensions.json vscode工作区插件推荐
│   └── settings.json vscode工作区设置
├── env 环境配置
├── certification 证书
├── src
│   ├── api 接口
│   ├── components 项目公共组件
│   ├── config 项目配置
│   ├── model 模型
│   │   ├── data 静态数据
│   │   ├── enum 枚举
│   │   ├── interface 接口
│   ├── pages 页面目录
│   ├── service 服务
│   │   ├── base-service 公共服务
│   │   ├── data-service 业务服务
│   ├── static 静态资源
│   │   ├── image 图片
│   │   ├── font 字体
│   ├── store 状态管理
│   ├── styles css样式
│   └── utils 工具包
│   ├── App.vue 入口文件
│   ├── main.js 主入口
│   ├── manifest.json 应用配置文件
│   ├── pages.json 全局配置文件
│   └── uni.scss uni-app内置的常用样式变量
├── .editorconfig 编辑器配置(需要安装依赖)
├── .eslintignore eslint忽略配置
├── .eslintrc eslint配置
├── .gitignore git忽略配置
├── .prettierrc.js prettier代码格式化配置
├── commitlint.config.js git提交规范配置
├── index.html 项目入口
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js vite配置
```
