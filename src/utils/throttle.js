function throttle(func, limit) {
  let lastCalled;
  let lastTime;

  if (!lastTime) {
    func();
    lastTime = Date.now();
  } else {
    clearTimeout(lastCalled);
    lastCalled = setTimeout(() => {
      if (Date.now() - lastTime >= limit) {
        func();
        lastTime = Date.now();
      }
    }, 0);
  }
}

export default throttle;
