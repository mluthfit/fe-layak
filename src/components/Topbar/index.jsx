import React from "react";
import style from "./style.module.css";

const Topbar = () => {
  return (
    <div className={style.topbar}>
      <h1>Dashboard</h1>
      <button className={style.adminDashboard}>Admin Dashboard</button>
    </div>
  );
};

export default Topbar;
