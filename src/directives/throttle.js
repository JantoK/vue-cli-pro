// 节流 v-throttle="func()"
const throttle = {
  inserted: function(el, binding) {
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
