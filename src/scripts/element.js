const getExactElementByClass = (el, className) => {
  let result = el;
  while (!result.classList.contains(className)) {
    result = result.parentNode;
  }

  return result;
};

export { getExactElementByClass };
