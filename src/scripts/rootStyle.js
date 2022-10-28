const root = document.querySelector(":root");
const rootCS = getComputedStyle(root);

const getStyle = (name) => {
  return rootCS.getPropertyValue(name);
};

const setStyle = (name, value) => {
  return root.style.setProperty(name, value);
};

export { getStyle, setStyle };
