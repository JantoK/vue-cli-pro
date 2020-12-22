function throttleFunc(fn, delay) {
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
      prevTime = Date.now();
      timer = null;
      fn.apply(context, args);
    }, delay);
  };
}
export default throttleFunc;
