import React from "react";
import { Outlet } from "react-router-dom";
import SideLogo from "../../components/SideLogo";
import style from "./style.module.css";

const Auth = () => {
  return (
    <div className={style.Login}>
      <div className={style.content}>
        <Outlet />
      </div>
      <div className={style.SideLogo}>
        <SideLogo />
      </div>
    </div>
  );
};

export default Auth;
