/* eslint-disable */
// https://umijs.org/config/
import { defineConfig } from "umi"
import px2rem from "postcss-plugin-px2rem"
import defaultSettings from "./defaultSettings"

const { REACT_APP_ENV } = process.env
export default defineConfig({
  // plugins: [
  //   // ref: https://umijs.org/plugin/umi-plugin-react.html
  //   ['umi-plugin-react', {
  //     antd: true,
  //     dva: { immer: true },
  //     dynamicImport: {
  //       webpackChunkName: true,
  //       loadingComponent: './components/PageLoading/index'
  //     },
  //     routes: {
  //       exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\//]
  //     },
  //     dll: false,
  //     /* hd即高清方案,移动端开启，pc端不建议开启，会自动转换px为rem,以750为单位1rem=100px=baseFontSize,
  //      其他屏按宽度计算baseFontSize,例如设计稿为1920，那么baseFontSize=256,rem计算公式为px/256*/
  //     hd: true,
  //     fastClick: true,
  //     history: 'hash',
  //     metas: [
  //       { charset: 'utf-8' }
  //     ],
  //     locale: {
  //       enable: true,
  //       baseNavigator: true,// 为true时，用navigator.language的值作为默认语言
  //       default: 'zh-CN'//默认语言 zh-CN
  //     },
  //     treeShaking: true,
  //     base: "/",//Specify the base of the react-router to be configured when deploying to a non-root directory
  //     publicPath: "/",//Specifies the publicPath of the webpack, pointing to the path where the static resource file is located.
  //     runtimePublicPath: true,//Use the window.publicPath specified in the HTML when the value is true
  //     title: 'XXXXXXX科技有限公司'
  //   }]
  // ],
  // extraPostCSSPlugins: [
  //   //https://www.npmjs.com/package/postcss-plugin-px2rem
  //   px2rem({
  //     rootValue: 192,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
  //     propBlackList: ['border', 'border-top', 'border-left', 'border-right', 'border-bottom', 'border-radius', 'font-size'],//这些属性不需要转换
  //     selectorBlackList: ['t_npx']//以包含t_npx的class不需要转换
  //   })
  // ],
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: "zh-CN",
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: "@/components/PageLoading/index",
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: "/user",
      component: "../layouts/UserLayout",
      routes: [
        {
          name: "login",
          path: "/user/login",
          component: "./user/login",
        },
      ],
    },
    {
      path: "/",
      component: "../layouts/SecurityLayout",
      routes: [
        {
          path: "/",
          component: "../layouts/BasicLayout",
          // authority: ["admin", "user"],
          routes: [
            {
              path: "/",
              redirect: "/home",
            },
            {
              path: "/home",
              name: "home",
              icon: "smile",
              component: "./Home",
            },
            {
              path: "/mapMonitor",
              name: "mapMonitor",
              icon: "smile",
              component: "./MapMonitor",
            },
          ],
        },
        {
          component: "./404",
        },
      ],
    },
    {
      component: "./404",
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    "primary-color": defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    "/api/": {
      target: "http://jxappserver.jiuxiniot.com:8080",
      // target: 'http://192.168.0.172:8090',
      // target: 'http://192.168.0.144:8799',
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  manifest: {
    basePath: "/",
  },
})
