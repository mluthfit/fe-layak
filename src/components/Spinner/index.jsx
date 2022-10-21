import React from "react";
import style from "./style.module.css";

const Spinner = ({ size, borderSize }) => {
  const documentEl = document.documentElement;
  documentEl.style.setProperty("--spinner-size", `${size}px`);
  documentEl.style.setProperty("--border-size", `${borderSize}px`);

  return <span className={style.spinner}></span>;
};

export default Spinner;
