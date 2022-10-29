/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { ReactComponent as OverviewIcon } from "../../assets/icons/square.svg";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as CutiIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as ReimburseIcon } from "../../assets/icons/calculator.svg";
import { ReactComponent as HideIcon } from "../../assets/icons/chevrons-left.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as EmployeesIcon } from "../../assets/icons/people.svg";
import { ReactComponent as CompanyIcon } from "../../assets/icons/organization.svg";
import { ReactComponent as AdminIcon } from "../../assets/icons/person-add.svg";
import { getStyle, setStyle } from "../../scripts/rootStyle";
import { getLocalStorage, setLocalStorage } from "../../scripts/localStorage";
import TypeRole from "../../scripts/role";
import style from "./style.module.css";

const Dashboard = ({ type, role }) => {
  const location = useLocation();
  const page = location.pathname.split("/")[2] ?? "overview";

  const showHideHandler = () => {
    const sidebarEl = document.querySelector("#sidebar");
    if (sidebarEl.classList.contains(style.hide)) {
      showSidebar(sidebarEl);
      setLocalStorage("sidebar-mode", "show");
      return;
    }

    hideSidebar(sidebarEl);
    setLocalStorage("sidebar-mode", "hide");
    return;
  };

  useEffect(() => {
    const sidebarEl = document.querySelector("#sidebar");
    const sidebarMode = getLocalStorage("sidebar-mode", "show");
    if (sidebarMode === "hide") {
      hideSidebar(sidebarEl);
      return;
    }

    showSidebar(sidebarEl);
  }, []);

  const showSidebar = (element) => element.classList.remove(style.hide);
  const hideSidebar = (element) => element.classList.add(style.hide);

  const relativePath = type === "user" ? "dashboard" : "admin";

  (() => {
    let background = getStyle("--secondary-200");
    let titleColor = getStyle("black");
    let primaryColor = getStyle("--primary-400");

    if (type === "admin") {
      background = getStyle("--primary-100");
      titleColor = getStyle("--primary-400");
      primaryColor = getStyle("--secondary-300");
    }

    setStyle("--background", background);
    setStyle("--primary-color", primaryColor);
    setStyle("--title-color", titleColor);
  })();

  return (
    <div className={style.dashboard}>
      <div id="sidebar" className={style.sidebar}>
        <div className={style.container}>
          <div>
            <span
              className={style.title}
              style={{
                visibility:
                  role !== TypeRole.USER && type === TypeRole.ADMIN
                    ? "visible"
                    : "hidden",
              }}
            >
              {role === TypeRole.ADMIN
                ? "Administator"
                : role === TypeRole.SUPERADMIN
                ? "Super Admin"
                : "User"}
            </span>
            <ul className={`${style.menu} ${style.topMenu}`}>
              {type === "user" && (
                <li className={page === "overview" ? `${style.active}` : ""}>
                  <Link to={`/${relativePath}`}>
                    <OverviewIcon />
                    <span>Overview</span>
                  </Link>
                </li>
              )}
              {role !== TypeRole.SUPERADMIN && (
                <li className={page === "absensi" ? `${style.active}` : ""}>
                  <Link to={`/${relativePath}/absensi`}>
                    <AbsensiIcon />
                    <span>Absensi</span>
                  </Link>
                </li>
              )}
              {role !== TypeRole.SUPERADMIN && (
                <li className={page === "cuti" ? `${style.active}` : ""}>
                  <Link to={`/${relativePath}/cuti`}>
                    <CutiIcon />
                    <span>Cuti</span>
                  </Link>
                </li>
              )}
              {role !== TypeRole.SUPERADMIN && (
                <li
                  className={page === "reimbursement" ? `${style.active}` : ""}
                >
                  <Link to={`/${relativePath}/reimbursement`}>
                    <ReimburseIcon />
                    <span>Reimbursement</span>
                  </Link>
                </li>
              )}
              {type === "admin" && role !== TypeRole.SUPERADMIN && (
                <li className={page === "employees" ? `${style.active}` : ""}>
                  <Link to="/admin/employees">
                    <EmployeesIcon />
                    <span>Akun Karyawan</span>
                  </Link>
                </li>
              )}
              {role === TypeRole.SUPERADMIN && (
                <li className={page === "perusahaan" ? `${style.active}` : ""}>
                  <Link to="/super-admin/perusahaan">
                    <CompanyIcon />
                    <span>Perusahaan</span>
                  </Link>
                </li>
              )}
              {role === TypeRole.SUPERADMIN && (
                <li
                  className={page === "administator" ? `${style.active}` : ""}
                >
                  <Link to="/super-admin/administator">
                    <AdminIcon />
                    <span>Administator</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <ul className={style.menu}>
            <li>
              <Link onClick={showHideHandler}>
                <HideIcon />
                <span>Sembunyikan</span>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <LogoutIcon />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div id="mainbar" className={style.mainbar}>
        <div className={style.topbar}>
          <h1>Dashboard</h1>
          {role === TypeRole.ADMIN && (
            <Link
              className={style.changeButton}
              to={type === "user" ? "/admin/absensi" : "/dashboard"}
            >
              {type === "user" ? "Admin Dashboard" : "User Dashboard"}
            </Link>
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
