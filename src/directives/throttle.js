// 节流 v-throttle="func()"
import throttleFunc from "../plugins/throttleFunc";
const throttle = {
  inserted: function(el, binding) {
    if (!binding.value) {
      // 默认触发函数
      binding.value = () => {
        return console.log("暂未设置触发函数，请先赋值触发函数");
      };
    }
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }
    const handler = throttleFunc(binding.value, 1000);
    el.addEventListener("click", () => {
      handler(el);
    });
  }
};

export default throttle;
