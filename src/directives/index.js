// 批量注册directives
import copy from "@/directives/copy";
import longPress from "./longPress";
import throttle from "./throttle";

const directives = {
  copy,
  longPress,
  throttle
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
