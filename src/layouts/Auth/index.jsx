import React from "react";
import { Outlet } from "react-router-dom";
import bluePattern from "../../assets/images/blue-pattern.png";
import logoLayak from "../../assets/images/logo.png";
import style from "./style.module.css";

const Auth = () => {
  return (
    <div className={style.auth}>
      <div className={`${style.content} ${style.flexCenter}`}>
        <Outlet />
      </div>
      <div
        className={`${style.sideLogo} ${style.flexCenter}`}
        style={{ backgroundImage: `url(${bluePattern})` }}
      >
        <img src={logoLayak} alt="layaK's logo" />
        <h1>LayaK</h1>
        <h2>Layanan Kantor Online</h2>
      </div>
    </div>
  );
};

export default Auth;
