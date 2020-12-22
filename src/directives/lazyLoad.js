// 图片懒加载 v-lazyLoad="imgUrl"
const lazyLoad = {
  // install方法
  install(Vue) {
    // 设置默认占位图
    const defaultSrc = require("../assets/images/default.png");
    Vue.directive("lazyLoad", {
      bind(el, binding) {
        lazyLoad.init(el, binding.value, defaultSrc);
      },
      inserted(el) {
        if (IntersectionObserver) {
          lazyLoad.observe(el);
        } else {
          lazyLoad.listenerScroll(el);
        }
      }
    });
  },
  // 初始化
  init(el, val, def) {
    el.setAttribute("data-src", val);
    el.setAttribute("src", def);
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    let io = new IntersectionObserver(entries => {
      const realSrc = el.dataset.src;
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc;
          el.removeAttribute("data-src");
        }
      }
    });
    io.observe(el);
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = lazyLoad.throttle(lazyLoad.load, 300);
    lazyLoad.load(el);
    window.addEventListener("scroll", () => {
      handler(el);
    });
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight;
    const elTop = el.getBoundingClientRect().top;
    const elBtm = el.getBoundingClientRect().bottom;
    const realSrc = el.dataset.src;
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc;
        el.removeAttribute("data-src");
      }
    }
  },

  // scroll事件节流
  throttle(fn, delay) {
    let timer;
    let prevTime;
    return function(...args) {
      const currTime = Date.now();
      const context = this;
      if (!prevTime) prevTime = currTime;
      clearTimeout(timer);

      if (currTime - prevTime > delay) {
        prevTime = currTime;
        fn.apply(context, args);
        return clearTimeout(timer);
      }

      timer = setTimeout(function() {
        prevTime = Date.new();
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  }
};

export default lazyLoad;
