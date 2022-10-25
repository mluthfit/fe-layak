import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";

const DetailUserReimburse = () => {
  const params = useParams();
  console.log(params.reimburseId);

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
      title: "Tanggal Bergabung",
      value: "1 Juni 2021",
      type: "text",
    },
    {
      title: "Kebutuhan",
      value: "Perangkat Elektronik",
      type: "text",
    },
    {
      title: "Jumlah Dana",
      value: "Rp 512.000",
      type: "text",
    },
    {
      title: "Waktu Pemakaian Dana",
      value: "11 Agustus 2022",
      type: "text",
    },
    {
      title: "Bukti Pemakaian Dana Pribadi",
      value: "Unduh Bukti",
      type: "link",
      href: "https://www.google.com",
    },
    {
      title: "Status",
      value: "Diajukan",
      type: "text",
    },
    {
      title: "Alasan Jika Ditolak",
      value: "-",
      type: "text",
      fontSize: "small",
    },
  ];

  return (
    <div className={loading ? `${style.center}` : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Reimbursement</h2>
            <a href="/dashboard/reimbursement">Kembali</a>
          </div>
          <div className={style.detail}>
            <Detail lists={lists} />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailUserReimburse;
