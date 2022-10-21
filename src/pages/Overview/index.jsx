import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import Biodata from "../../components/Biodata";
import "./style.css";
import CompanyProfile from "../../components/CompanyProfile";

const Overview = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="overview">
      {/* <Spinner size={48} borderSize={5} /> */}
      <div className="leftSide">
        <Biodata />
        <div className="space"></div>
        <CompanyProfile />
      </div>
      <div className="rightSide"></div>
    </div>
  );
};

export default Overview;
