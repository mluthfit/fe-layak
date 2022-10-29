import React from "react";
import { Link } from "react-router-dom";
import { getStyle, setStyle } from "../../scripts/rootStyle";
import style from "./style.module.css";

const Bar = ({ title, link, barColor, icons }) => {
  if (!barColor) {
    barColor = getStyle("--primary-100");
  }

  setStyle("--bar-color", barColor);

  return (
    <Link to={link} className={style.bar}>
      <span className={style.title}>{title}</span>
      <div className={style.icons}>{icons}</div>
    </Link>
  );
};

export default Bar;
