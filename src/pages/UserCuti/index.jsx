import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import "./style.css";

const UserCuti = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <div className={`userCuti ${loading ? `center` : ""}`}>
      {loading ? (
        <Spinner size={48} borderSize={5} />
      ) : (
        <>
          <h2>Pengajuan Cuti</h2>
          <div className="mainCuti">
            <div className="leftSide"></div>
            <div className="rightSide"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCuti;
