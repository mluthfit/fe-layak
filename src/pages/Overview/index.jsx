import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Biodata from "../../components/Biodata";
import CompanyProfile from "../../components/CompanyProfile";
import AbsensiOverview from "../../components/AbsensiOverview";
import "./style.css";

const Overview = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <div className={`overview ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner size={48} borderSize={5} />
      ) : (
        <>
          <div className="leftSide">
            <Biodata />
            <div className="space"></div>
            <CompanyProfile />
          </div>
          <div className="rightSide">
            <AbsensiOverview />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
