import React from "react";
import style from "./style.module.css";

const Bar = ({ title, link, icons }) => {
  return (
    <a href={link} className={style.bar}>
      <span className={style.title}>{title}</span>
      <div className={style.icons}>{icons}</div>
    </a>
  );
};

export default Bar;
