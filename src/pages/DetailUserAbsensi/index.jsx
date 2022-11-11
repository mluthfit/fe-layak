/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import { toDateFormat, toTimeFormat } from "../../scripts/string";
import style from "./style.module.css";

const DetailUserAbsensi = () => {
  const navigate = useNavigate();
  const { absensiId } = useParams();
  const [loading, setLoading] = useState(true);

  const [detail, setDetail] = useState({
    name: "",
    position: "",
    email: "",
    date: "",
    clockIn: "",
    clockOut: "",
    photoUrl: "",
  });

  const fetchDetail = async () => {
    try {
      const { data: response } = await axios.get(`/presences/${absensiId}`);
      if (response.success === "false") {
        navigate("/dashboard/absensi");
        throw response.messages;
      }

      setDetail({
        name: response.data.user.nama,
        position: response.data.user.position,
        email: response.data.user.email,
        date: toDateFormat(response.data.createdAt),
        clockIn: toTimeFormat(response.data.clock_in) || "-",
        clockOut: toTimeFormat(response.data.clock_out) || "-",
        photoUrl: response.data.foto,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
      title: "Tanggal Absensi",
      value: detail.date,
      type: "text",
    },
    {
      title: "Waktu Absensi Masuk",
      value: detail.clockIn,
      type: "text",
    },
    {
      title: "Waktu Absensi Pulang",
      value: detail.clockOut,
      type: "text",
    },
    {
      title: "Foto Absensi Masuk",
      value: detail.photoUrl,
      type: "image",
    },
  ];

  useEffect(() => {
    const id = parseInt(absensiId);
    if (isNaN(id) || id <= 0) {
      navigate("/dashboard/absensi");
      return;
    }

    fetchDetail();
    document.title = "Detail Absensi - Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Absensi</h2>
            <Link to="/dashboard/absensi">Kembali</Link>
          </div>
          <div className={style.detail}>
            <Detail lists={lists} />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailUserAbsensi;
