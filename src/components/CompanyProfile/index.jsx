import React from "react";
import { ReactComponent as AtomIcon } from "../../assets/icons/atom.svg";
import { ReactComponent as MapIcon } from "../../assets/icons/map.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as TelpIcon } from "../../assets/icons/call-hash.svg";
import { ReactComponent as WebIcon } from "../../assets/icons/globe.svg";
import { ReactComponent as CutiIcon } from "../../assets/icons/calendar-dates.svg";
import style from "./style.module.css";

const CompanyProfile = () => {
  return (
    <div className={style.companyProfile}>
      <h2>Perusahaan</h2>
      <div className={style.details}>
        <div>
          <AtomIcon />
          <span>Gojek Indonesia</span>
        </div>
        <div>
          <MapIcon />
          <span>Jl. Sudirman No. 395</span>
        </div>
        <div>
          <EmailIcon />
          <span>cs@gojek.com</span>
        </div>
        <div>
          <TelpIcon />
          <span>+222 923 182</span>
        </div>
        <div>
          <WebIcon />
          <span>www.gojek.com</span>
        </div>
        <div>
          <CutiIcon />
          <span>5 per tahun</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
