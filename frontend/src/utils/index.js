export function debounce(fun, waitTime) {
  let timeoutId;
  let callTime = 0;

  return function(...rest) {
    const now = Date.now();

    if (now < callTime) {
      clearTimeout(timeoutId);
    }

    callTime = now + waitTime;
    timeoutId = setTimeout(() => {
      fun.call(this, ...rest);
    }, waitTime);
  };
}
