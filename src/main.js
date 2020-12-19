import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入封装后的axios
import "./plugins/axios";

// 样式重制
import "@/assets/stylus/reset.styl";

// 注册SvgIcon组件
import svgIcon from "./components/SvgIcon";
Vue.component("svg-icon", svgIcon);

// 注册自定义指令
import Directives from "@/directives/index";
Vue.use(Directives);

// 加载全局SvgIcons
const req = require.context("@/assets/icons", false, /\.svg$/);
const requireAll = requireContent => requireContent.keys().map(requireContent);
requireAll(req);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
