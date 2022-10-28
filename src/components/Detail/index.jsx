import React from "react";
import style from "./style.module.css";

const Detail = ({ lists }) => {
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
            <>
              <img src="placeholder.png" alt="placeholder" />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Detail;
