import React from "react";
import style from "./style.module.css";
import { ReactComponent as OverviewIcon } from "../../assets/icons/square.svg";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as CutiIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as ReimburseIcon } from "../../assets/icons/calculator.svg";
import { ReactComponent as HideIcon } from "../../assets/icons/chevrons-left.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";

const Sidebar = () => {
  const hideToggle = () => {
    const sidebarEl = document.querySelector("#sidebar");
    sidebarEl.classList.toggle(`${style.hide}`);
  };

  return (
    <div id="sidebar" className={style.sidebar}>
      <div className={style.container}>
        <ul className={`${style.menu} ${style.topMenu}`}>
          <li className={style.active}>
            <a href="/dashboard">
              <OverviewIcon />
              <span>Overview</span>
            </a>
          </li>
          <li>
            <a href="/dashboard/absensi">
              <AbsensiIcon />
              <span>Absensi</span>
            </a>
          </li>
          <li>
            <a href="/dashboard/cuti">
              <CutiIcon />
              <span>Cuti</span>
            </a>
          </li>
          <li>
            <a href="/dashboard/reimbursement">
              <ReimburseIcon />
              <span>Reimbursement</span>
            </a>
          </li>
        </ul>
        <ul className={style.menu}>
          <li>
            <a onClick={hideToggle}>
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
  );
};

export default Sidebar;
