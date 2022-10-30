import React from "react";
import { Link } from "react-router-dom";
import { keyToCapitalize } from "../../scripts/string";
import style from "./style.module.css";

const Table = ({ rows, iconLabel, icons, href, isHistory }) => {
  return (
    <div className={`${style.table} ${isHistory ? `${style.historyRow}` : ""}`}>
      <div className={style.thead}>
        <div className={`${style.tr} gray`}>
          {Object.keys(rows[0]).map((key, index) => (
            <div className={style.td} key={index}>
              {keyToCapitalize(key, "_")}
            </div>
          ))}
          <div className={style.td}>{iconLabel}</div>
        </div>
      </div>
      <div className={style.tbody}>
        {!href ? (
          <>
            {rows.map((row, parentIdx) => (
              <div key={parentIdx} className={style.tr}>
                {Object.values(row).map((value, childIdx) => (
                  <div className={style.td} key={`${parentIdx}${childIdx}`}>
                    {value}
                  </div>
                ))}
                <div className={style.td}>
                  <div className={style.icons}>{icons[parentIdx]}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {rows.map((row, parentIdx) => (
              <Link to={href[parentIdx]} key={parentIdx} className={style.tr}>
                {Object.values(row).map((value, childIdx) => (
                  <div className={style.td} key={`${parentIdx}${childIdx}`}>
                    {value}
                  </div>
                ))}
                <div className={style.td}>
                  <div className={style.icons}>{icons[parentIdx]}</div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
