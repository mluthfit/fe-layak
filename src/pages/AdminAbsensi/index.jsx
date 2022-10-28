import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import "./style.css";

const AdminAbsensi = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const width = {
    nama: "450px",
    jabatan: "350px",
    jam_masuk: "100px",
  };

  const rowsDone = [
    {
      nama: "Ahmad Sumandi Wijayakarto",
      jabatan: "IT Architecture",
      jam_masuk: "08:00",
    },
    {
      nama: "Angkara Messi",
      jabatan: "Cleaning Service",
      jam_masuk: "07.00",
    },
  ];

  const hrefDone = ["/admin/absensi/1", "/admin/absensi/2"];
  const statusDone = [
    <>
      <span className="success">
        <ClockInIcon />
      </span>
      <span className="danger">
        <ClockOutIcon />
      </span>
    </>,
    <>
      <span className="success">
        <ClockInIcon />
      </span>
      <span className="danger">
        <ClockOutIcon />
      </span>
    </>,
  ];

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
            <Table
              rows={rowsDone}
              status={statusDone}
              width={width}
              href={hrefDone}
            />
          </div>
          <div className="history">
            <div className="title">
              <h3>Belum Melakukan Absensi</h3>
              <input type="text" placeholder="Cari nama atau jabatan" />
            </div>
            <Table
              rows={rowsDone}
              status={statusDone}
              width={width}
              href={hrefDone}
              isHistory={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAbsensi;
