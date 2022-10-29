import React from "react";
import { getStyle, setStyle } from "../../scripts/rootStyle";
import style from "./style.module.css";

const Bar = ({ title, link, barColor, icons }) => {
  if (!barColor) {
    barColor = getStyle("--primary-100");
  }

  setStyle("--bar-color", barColor);

  return (
    <a href={link} className={style.bar}>
      <span className={style.title}>{title}</span>
      <div className={style.icons}>{icons}</div>
    </a>
  );
};

export default Bar;
