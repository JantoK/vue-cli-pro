// 批量注册directives
import copy from "@/directives/copy";

const directives = {
  copy
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
