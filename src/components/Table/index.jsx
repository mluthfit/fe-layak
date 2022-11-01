import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

const Table = ({ type, label, rows, icon, href }) => {
  return (
    <div
      className={`${style.table} ${
        type === "history" ? `${style.historyRow}` : ""
      }`}
    >
      {rows.length <= 0 ? (
        <span className={style.notFound}>Data tidak ditemukan</span>
      ) : (
        <>
          <div className={style.thead}>
            <div className={`${style.tr} gray`}>
              {label.map((value, index) => (
                <div className={style.td} key={index}>
                  {value}
                </div>
              ))}
              <div className={style.td}>{icon.label}</div>
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
                      <div className={style.icons}>
                        {icon.element[parentIdx]}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {rows.map((row, parentIdx) => (
                  <Link
                    to={href[parentIdx]}
                    key={parentIdx}
                    className={style.tr}
                  >
                    {Object.values(row).map((value, childIdx) => (
                      <div className={style.td} key={`${parentIdx}${childIdx}`}>
                        {value}
                      </div>
                    ))}
                    <div className={style.td}>
                      <div className={style.icons}>
                        {icon.element[parentIdx]}
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
