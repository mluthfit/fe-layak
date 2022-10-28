import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";

const DetailUserCuti = () => {
  const params = useParams();
  console.log(params.cutiId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

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
      title: "Sisa Cuti Terakhir",
      value: 5,
      type: "text",
    },
    {
      title: "Kategori Cuti",
      value: "Lainnya",
      type: "text",
    },
    {
      title: "Rentang Waktu Cuti",
      value: "2 Oktober 2022 - 5 Oktober 2022",
      type: "text",
    },
    {
      title: "Deskripsi",
      value:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      type: "text",
      fontSize: "small",
    },
    {
      title: "Dokumen Cuti",
      value: "Unduh Dokumen",
      type: "link",
      href: "https://www.google.com",
    },
    {
      title: "Status",
      value: "Ditolak",
      type: "text",
      fontColor: "danger",
    },
    {
      title: "Alasan Jika Ditolak",
      value:
        "Rentang waktu yang diusulkan tidak dapat diterima karena perusahaan membutuhkan produksi besar",
      type: "text",
      fontSize: "small",
    },
  ];

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Pengajuan Cuti</h2>
            <a href="/dashboard/cuti">Kembali</a>
          </div>
          <div className={style.detail}>
            <Detail lists={lists} />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailUserCuti;
