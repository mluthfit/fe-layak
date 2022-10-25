import React from "react";
import style from "./style.module.css";

const Spinner = ({ type, size, borderSize }) => {
  const root = document.querySelector(":root");
  const rootCS = getComputedStyle(root);

  let borderColor = rootCS.getPropertyValue("--primary-400");

  if (type === "admin") {
    borderColor = rootCS.getPropertyValue("--secondary-300");
  }

  root.style.setProperty("--spinner-size", `${size}px`);
  root.style.setProperty("--border-color", borderColor);
  root.style.setProperty("--border-size", `${borderSize}px`);

  return <span className={style.spinner}></span>;
};

export default Spinner;
