import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import style from "./style.module.css";

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
