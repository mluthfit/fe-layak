import React from "react";
import bluepattern from "../../assets/images/blue-pattern.png";
import logolayak from "../../assets/images/logo.png";
import style from "./style.module.css";

const SideLogo = () => {
  return (
    <div
      className={style.SideLogo}
      style={{ backgroundImage: `url(${bluepattern})` }}
    >
      {/* <div className={style.SideContainer}> */}
      <img src={logolayak} alt="logolayak" />
      <h1>LayaK</h1>
      <h2>Layanan Kantor Online</h2>
      {/* </div> */}
    </div>
  );
};

export default SideLogo;
