import React from "react";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import Bar from "../Bar";
import style from "./style.module.css";

const CutiOverview = () => {
  return (
    <div className={style.cutiOverview}>
      <div className={style.header}>
        <h2>Pengajuan Cuti</h2>
        <a href="/dashboard/cuti" className={style.anchorIcon}>
          <CalendarIcon />
        </a>
      </div>
      <div className={style.sisaCuti}>
        <span className={style.label}>Sisa Cuti</span>
        <span className={style.value}>10 Hari</span>
      </div>
      <div className={style.listBar}>
        {/* <span>Anda belum pernah melakukan pengajuan cuti</span> */}
        <Bar
          link="/dashboard/cuti/1"
          title="06 Januari 2021 - 08 Januari 2021"
          icons={
            <>
              <span className={`${style.icon} ${style.requested}`}>
                <RequestedIcon />
              </span>
            </>
          }
        />
        <Bar
          link="/dashboard/cuti/2"
          title="06 Januari 2021 - 08 Januari 2021"
          icons={
            <>
              <span className={`${style.icon} ${style.approved}`}>
                <ApprovedIcon />
              </span>
            </>
          }
        />
        <Bar
          link="/dashboard/cuti/3"
          title="06 Januari 2021 - 08 Januari 2021"
          icons={
            <>
              <span className={`${style.icon} ${style.declined}`}>
                <DeclinedIcon />
              </span>
            </>
          }
        />
      </div>
    </div>
  );
};

export default CutiOverview;
