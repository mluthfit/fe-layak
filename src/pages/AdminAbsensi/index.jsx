import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";

const AdminAbsensi = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <div className={`adminAbsensi ${loading ? "center" : ""}`}>
      {loading ? <Spinner type="admin" size={48} borderSize={5} /> : <></>}
    </div>
  );
};

export default AdminAbsensi;
