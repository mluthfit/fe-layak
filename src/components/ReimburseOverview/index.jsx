import React from "react";
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator.svg";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import Bar from "../Bar";
import style from "./style.module.css";

const ReimburseOverview = () => {
  return (
    <div className={style.reimburseOverview}>
      <div className={style.header}>
        <h2>Reimbursement</h2>
        <a href="/dashboard/reimbursement" className={style.anchorIcon}>
          <CalculatorIcon />
        </a>
      </div>
      <div className={style.listBar}>
        {/* <span>Anda belum pernah melakukan pengajuan reimbursement</span> */}
        <Bar
          link="/dashboard/reimbursement/1"
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
          link="/dashboard/reimbursement/2"
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
          link="/dashboard/reimbursement/3"
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

export default ReimburseOverview;
