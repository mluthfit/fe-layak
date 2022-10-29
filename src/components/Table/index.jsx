import React from "react";
import { Link } from "react-router-dom";
import { keyToCapitalize } from "../../scripts/string";
import "./style.css";

const Table = ({ rows, status, width, href, isHistory }) => {
  return (
    <div className={`table ${isHistory ? "historyRow" : ""}`}>
      <div className="thead">
        <div className="tr gray">
          {Object.keys(width).map((key, index) => (
            <div className="td" key={index}>
              {keyToCapitalize(key, "_")}
            </div>
          ))}
          <div className="td">Status</div>
        </div>
      </div>
      <div className="tbody">
        {rows.map((row, parentIdx) => (
          <Link to={href[parentIdx]} key={parentIdx} className="tr">
            {Object.values(row).map((value, childIdx) => (
              <div className="td" key={`${parentIdx}${childIdx}`}>
                {value}
              </div>
            ))}
            <div className="td">
              <div className="status">{status[parentIdx]}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Table;
