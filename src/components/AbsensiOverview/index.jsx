import React from "react";
import Bar from "../Bar";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import style from "./style.module.css";

const AbsensiOverview = () => {
  return (
    <div className={style.absensiOverview}>
      <div className={style.header}>
        <h2>Absensi</h2>
        <a href="/dashboard/absensi" className={style.anchorIcon}>
          <AbsensiIcon />
        </a>
      </div>
      <div className={style.statusToday}>
        <div>
          <span className={`${style.icon} ${style.success}`}>
            <ClockInIcon />
          </span>
          <span className={style.time}>08:00</span>
        </div>
        <div>
          <span className={`${style.icon} ${style.danger}`}>
            <ClockOutIcon />
          </span>
          <span className={`${style.time} ${style.gray}`}>
            Belum melakukan absensi pulang
          </span>
        </div>
      </div>
      <div className={style.listBar}>
        <Bar
          link="/dashboard/absensi/1"
          title="06 Januari 2021"
          icons={
            <>
              <span className={`${style.icon} ${style.success}`}>
                <ClockInIcon />
              </span>
              <span className={`${style.icon} ${style.danger}`}>
                <ClockOutIcon />
              </span>
            </>
          }
        />
        <Bar
          link="/dashboard/absensi/2"
          title="05 Januari 2021"
          icons={
            <>
              <span className={`${style.icon} ${style.danger}`}>
                <ClockInIcon />
              </span>
              <span className={`${style.icon} ${style.danger}`}>
                <ClockOutIcon />
              </span>
            </>
          }
        />
      </div>
    </div>
  );
};

export default AbsensiOverview;
