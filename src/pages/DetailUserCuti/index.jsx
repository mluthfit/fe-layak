/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import { toDateFormat } from "../../scripts/string";
import style from "./style.module.css";

const DetailUserCuti = () => {
  const navigate = useNavigate();
  const { cutiId } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({
    name: "",
    position: "",
    email: "",
    sisaCuti: "",
    kategori: "",
    rentang_waktu: "",
    deskripsi: "",
    dokumen: "",
    status: "",
    reason_declined: "-",
  });

  const lists = [
    {
      title: "Nama",
      value: detail.name,
      type: "text",
    },
    {
      title: "Jabatan",
      value: detail.position,
      type: "text",
    },
    {
      title: "Email",
      value: detail.email,
      type: "text",
    },
    {
      title: "Sisa Cuti Terakhir",
      value: detail.sisaCuti,
      type: "text",
    },
    {
      title: "Kategori Cuti",
      value: detail.kategori,
      type: "text",
    },
    {
      title: "Rentang Waktu Cuti",
      value: detail.rentang_waktu,
      type: "text",
    },
    {
      title: "Deskripsi",
      value: detail.deskripsi,
      type: "text",
      fontSize: "small",
    },
    {
      title: "Dokumen Cuti",
      value: "Unduh Dokumen",
      type: "link",
      href: detail.dokumen,
    },
    {
      title: "Status",
      value: detail.status,
      type: "text",
      fontColor:
        detail.status === "Approved"
          ? "success"
          : detail.status === "Declined"
          ? "danger"
          : "",
    },
    {
      title: "Alasan Jika Ditolak",
      value: detail.reason_declined || "-",
      type: "text",
      fontSize: "small",
    },
  ];

  const fetchDetail = async () => {
    try {
      const { data: response } = await axios.get(`/leaves/${cutiId}`);

      if (response.success === "false") {
        navigate("/dashboard/cuti");
        throw response.messages;
      }

      setDetail({
        name: response.data.user.nama,
        position: response.data.user.position,
        email: response.data.user.email,
        sisaCuti: response.data.user.sisa_cuti,
        kategori: response.data.tipe_cuti,
        rentang_waktu: `${toDateFormat(
          response.data.start_date
        )} - ${toDateFormat(response.data.end_date)}`,
        deskripsi: response.data.deskripsi,
        dokumen: response.data.surat_cuti,
        status: response.data.status,
        reason_declined: response.data.alasan_ditolak,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = parseInt(cutiId);
    if (isNaN(id) || id <= 0) {
      navigate("/dashboard/cuti");
      return;
    }

    fetchDetail();
    document.title = "Detail Cuti - Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Pengajuan Cuti</h2>
            <Link to="/dashboard/cuti">Kembali</Link>
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
