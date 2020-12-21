// 批量注册directives
import copy from "@/directives/copy";
import longPress from "./longPress";

const directives = {
  copy,
  longPress
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
