// 节流 v-throttle="func()"
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
    let timer;
    el.addEventListener("click", () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 500);
    });
  }
};

export default throttle;
