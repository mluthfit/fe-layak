import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import "./style.css";

const Overview = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? <Spinner size={48} borderSize={5} /> : <h1>Overview</h1>}
    </div>
  );
};

export default Overview;
