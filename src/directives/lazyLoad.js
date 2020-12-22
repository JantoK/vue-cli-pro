// 图片懒加载 v-lazyLoad="imgUrl"
import throttleFunc from "../plugins/throttleFunc";
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
    const handler = throttleFunc(lazyLoad.load, 500);
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
  }
};

export default lazyLoad;
