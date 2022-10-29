import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";

const DetailAdminAbsensi = () => {
  const params = useParams();
  console.log(params.absensiId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const listBar = [
    {
      link: "/admin/absensi/1",
      title: "06 Januari 2021",
      icons: (
        <>
          <span className="success">
            <ClockInIcon />
          </span>
          <span className="danger">
            <ClockOutIcon />
          </span>
        </>
      ),
    },
    {
      link: "/admin/absensi/2",
      title: "05 Januari 2021",
      icons: (
        <>
          <span className="success">
            <ClockInIcon />
          </span>
          <span className="danger">
            <ClockOutIcon />
          </span>
        </>
      ),
    },
  ];

  const lists = [
    {
      title: "Nama",
      value: "Ahmad Sodikin Alkabar",
      type: "text",
    },
    {
      title: "Jabatan",
      value: "Junior Software Engineer",
      type: "text",
    },
    {
      title: "Email",
      value: "ahmadsodikin64@amazon.id",
      type: "text",
    },
    {
      title: "Tanggal Absensi",
      value: "24 Oktober 2022",
      type: "text",
    },
    {
      title: "Waktu Absensi Masuk",
      value: "08.00",
      type: "text",
    },
    {
      title: "Waktu Absensi Pulang",
      value: "-",
      type: "text",
    },
    {
      title: "Foto Absensi Masuk",
      value: "https://via.placeholder.com/150",
      type: "image",
    },
    {
      title: "Riwayat Absensi",
      type: "listBar",
      blank: "Belum ada riwayat absensi",
      listBar,
    },
  ];

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Absensi</h2>
            <a href="/admin/absensi">Kembali</a>
          </div>
          <div className={style.detail}>
            <Detail lists={lists} />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailAdminAbsensi;
