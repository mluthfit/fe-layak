import React from "react";
import { Outlet } from "react-router-dom";
import style from "./style.module.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const Dashboard = () => {
  return (
    <div className={style.dashboard}>
      <Sidebar />
      <div className={style.mainbar}>
        <Topbar />
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
