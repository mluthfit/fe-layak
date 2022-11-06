import React from "react";
import Bar from "../Bar";
import { getStyle } from "../../scripts/rootStyle";
import style from "./style.module.css";

const Detail = ({ lists }) => {
  const barColor = getStyle("--secondary-100");
  const storageUrl = process.env.REACT_APP_STORAGE_URL;

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
          {item.type === "link" &&
            (item.href ? (
              <a
                href={`${storageUrl}/${item.href}`}
                className={style.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.value}
              </a>
            ) : (
              <span>-</span>
            ))}

          {item.type === "image" &&
            (!item.value ? (
              <span>-</span>
            ) : (
              <div className={style.image}>
                <img src={`${storageUrl}/${item.value}`} alt="placeholder" />
              </div>
            ))}
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
