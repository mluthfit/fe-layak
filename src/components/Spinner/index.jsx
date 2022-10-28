import React from "react";
import { getStyle, setStyle } from "../../scripts/rootStyle";
import style from "./style.module.css";

const Spinner = ({ type, size, borderSize }) => {
  const borderColor =
    type === "admin" ? getStyle("--secondary-300") : getStyle("--primary-400");

  setStyle("--spinner-size", `${size}px`);
  setStyle("--border-color", borderColor);
  setStyle("--border-size", `${borderSize}px`);

  return <span className={style.spinner}></span>;
};

export default Spinner;
