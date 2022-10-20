import React from "react";
import style from "./style.module.css";

const Topbar = () => {
  return (
    <div className={style.topbar}>
      <h1>Dashboard</h1>
      <a className={style.adminDashboard} href="/admin">
        Admin Dashboard
      </a>
    </div>
  );
};

export default Topbar;
