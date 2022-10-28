import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import "./style.css";

const AdminAbsensi = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const doneRows = [
    {
      nama: "Ahmad Sumandi Wijayakarto",
      jabatan: "IT Architecture",
      jam_masuk: "08:00",
    },
    {
      nama: "Ahmad Sumandi Wijayakarto",
      jabatan: "IT Architecture",
      jam_masuk: "08:00",
    },
  ];

  const doneStatus = [];

  return (
    <div className={`adminAbsensi ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <h2>Status Absensi Hari Ini</h2>
          <div>
            <div className="title">
              <h3>Sudah Absensi</h3>
              <input type="text" placeholder="Cari nama atau jabatan" />
            </div>
            <Table rows={doneRows} />
          </div>
          <div className="history">
            <div className="title">
              <h3>Belum Melakukan Absensi</h3>
              <input type="text" placeholder="Cari nama atau jabatan" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAbsensi;
