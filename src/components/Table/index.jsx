import React from "react";
import { keyToCapitalize } from "../../scripts/string";
import "./style.css";

const Table = ({ rows, status, width }) => {
  return (
    <div className="table">
      <div className="header">
        {Object.keys(rows[0]).map((key, index) => (
          <span key={`h${index}`}>{keyToCapitalize(key, "_")}</span>
        ))}
        <span>Status</span>
      </div>
      <div className="rows">
        {rows.map((row, rowIdx) => (
          <div className="row">
            <div className="main">
              {Object.keys(row).map(
                (key, keyIdx) =>
                  key !== "status" && (
                    <span key={`${rowIdx}${keyIdx}`}>{row[key]}</span>
                  )
              )}
            </div>
            <div className="status"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
