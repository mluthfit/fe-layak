import React from "react";
import { keyToCapitalize } from "../../scripts/string";
import "./style.css";

const Table = ({ rows, status, width, href, isHistory }) => {
  return (
    <div className={`table ${isHistory ? "history" : ""}`}>
      <div className="header gray">
        <div className="main">
          {Object.keys(rows[0]).map((key, index) => (
            <span key={`h${index}`} style={{ width: width[key] }}>
              {keyToCapitalize(key, "_")}
            </span>
          ))}
        </div>
        <div className="status">
          <span>Status</span>
        </div>
      </div>
      <div className="rows">
        {rows.map((row, rowIdx) => (
          <a href={href[rowIdx]} className="row">
            <div className="main">
              {Object.keys(row).map((key, keyIdx) => (
                <span key={`${rowIdx}${keyIdx}`} style={{ width: width[key] }}>
                  {row[key]}
                </span>
              ))}
            </div>
            <div className="status">{status[rowIdx]}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Table;
