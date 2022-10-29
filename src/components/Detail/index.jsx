import React from "react";
import { getStyle } from "../../scripts/rootStyle";
import Bar from "../Bar";
import style from "./style.module.css";

const Detail = ({ lists }) => {
  const barColor = getStyle("--secondary-100");

  return (
    <div className={style.detail}>
      {lists?.map((item, index) => (
        <div key={index} className={style.item}>
          <span className={style.title}>{item.title}</span>
          {item.type === "text" && (
            <span
              className={`${style.value} ${
                item.fontSize === "small" ? `${style.smallFont}` : ""
              } ${
                item.fontColor === "danger"
                  ? `${style.danger}`
                  : `${item.fontColor === "success" ? `${style.success}` : ""}`
              }`}
            >
              {item.value}
            </span>
          )}
          {item.type === "link" && (
            <a
              href={item.href}
              className={style.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.value}
            </a>
          )}
          {item.type === "image" && (
            <div className={style.image}>
              <img src={item.value} alt="placeholder" />
            </div>
          )}
          {item.type === "listBar" && (
            <div style={{ width: "75%" }}>
              {!item.listBar?.length && (
                <span className={style.blank}>{item.blank}</span>
              )}
              {item.listBar?.map((bar, index) => (
                <Bar
                  key={index}
                  link={bar.link}
                  title={bar.title}
                  icons={bar.icons}
                  barColor={barColor}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Detail;
