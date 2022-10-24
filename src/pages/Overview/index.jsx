import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Biodata from "../../components/Biodata";
import CompanyProfile from "../../components/CompanyProfile";
import AbsensiOverview from "../../components/AbsensiOverview";
import CutiOverview from "../../components/CutiOverview";
import ReimburseOverview from "../../components/ReimburseOverview";
import style from "./style.module.css";

const Overview = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <div className={`${style.overview} ${loading ? `${style.center}` : ""}`}>
      {loading ? (
        <Spinner size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.leftSide}>
            <Biodata />
            <div className={style.space}></div>
            <CompanyProfile />
          </div>
          <div className={style.rightSide}>
            <AbsensiOverview />
            <div className={style.space}></div>
            <CutiOverview />
            <div className={style.space}></div>
            <ReimburseOverview />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
