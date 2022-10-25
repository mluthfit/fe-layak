/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactComponent as OverviewIcon } from "../../assets/icons/square.svg";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as CutiIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as ReimburseIcon } from "../../assets/icons/calculator.svg";
import { ReactComponent as HideIcon } from "../../assets/icons/chevrons-left.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import style from "./style.module.css";

const Dashboard = ({ type, role }) => {
  const location = useLocation();
  const page = location.pathname.split("/")[2] ?? "overview";

  const hideSidebar = () => {
    const sidebarEl = document.querySelector("#sidebar");
    sidebarEl.classList.toggle(`${style.hide}`);
  };

  (() => {
    const root = document.querySelector(":root");
    const rootCS = getComputedStyle(root);

    let background = rootCS.getPropertyValue("--secondary-200");
    let titleColor = rootCS.getPropertyValue("black");
    let primaryColor = rootCS.getPropertyValue("--primary-400");

    if (type === "admin") {
      background = rootCS.getPropertyValue("--primary-100");
      titleColor = rootCS.getPropertyValue("--primary-400");
      primaryColor = rootCS.getPropertyValue("--secondary-300");
    }

    root.style.setProperty("--background", background);
    root.style.setProperty("--primary-color", primaryColor);
    root.style.setProperty("--title-color", titleColor);
  })();

  return (
    <div className={style.dashboard}>
      <div id="sidebar" className={style.sidebar}>
        <div className={style.container}>
          <ul className={`${style.menu} ${style.topMenu}`}>
            <li className={page === "overview" ? `${style.active}` : ""}>
              <a href="/dashboard">
                <OverviewIcon />
                <span>Overview</span>
              </a>
            </li>
            <li className={page === "absensi" ? `${style.active}` : ""}>
              <a href="/dashboard/absensi">
                <AbsensiIcon />
                <span>Absensi</span>
              </a>
            </li>
            <li className={page === "cuti" ? `${style.active}` : ""}>
              <a href="/dashboard/cuti">
                <CutiIcon />
                <span>Cuti</span>
              </a>
            </li>
            <li className={page === "reimbursement" ? `${style.active}` : ""}>
              <a href="/dashboard/reimbursement">
                <ReimburseIcon />
                <span>Reimbursement</span>
              </a>
            </li>
          </ul>
          <ul className={style.menu}>
            <li>
              <a onClick={hideSidebar}>
                <HideIcon />
                <span>Sembunyikan</span>
              </a>
            </li>
            <li>
              <a href="/logout">
                <LogoutIcon />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="mainbar" className={style.mainbar}>
        <div className={style.topbar}>
          <h1>Dashboard</h1>
          {role === "admin" && (
            <a
              className={style.changeButton}
              href={type === "user" ? "/admin" : "/dashboard"}
            >
              {type === "user" ? "Admin Dashboard" : "User Dashboard"}
            </a>
          )}
        </div>
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
