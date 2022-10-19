import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div>Topbar</div>
      <div>Sidebar</div>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
