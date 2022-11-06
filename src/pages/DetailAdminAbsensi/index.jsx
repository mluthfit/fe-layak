/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
// import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import { toDateFormat, toTimeFormat } from "../../scripts/string";
import style from "./style.module.css";

const DetailAdminAbsensi = () => {
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
    // history: [],
  });

  const fetchDetail = async () => {
    try {
      const { data: response } = await axios.get(
        `/admin/presences/${absensiId}`
      );
      if (response.success === "false") {
        navigate("/admin/absensi");
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

  // const listBar = [
  //   {
  //     link: "/admin/absensi/1",
  //     title: "06 Januari 2021",
  //     icons: (
  //       <>
  //         <span className="success">
  //           <ClockInIcon />
  //         </span>
  //         <span className="danger">
  //           <ClockOutIcon />
  //         </span>
  //       </>
  //     ),
  //   },
  //   {
  //     link: "/admin/absensi/2",
  //     title: "05 Januari 2021",
  //     icons: (
  //       <>
  //         <span className="success">
  //           <ClockInIcon />
  //         </span>
  //         <span className="danger">
  //           <ClockOutIcon />
  //         </span>
  //       </>
  //     ),
  //   },
  // ];

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
    // {
    //   title: "Riwayat Absensi",
    //   type: "listBar",
    //   blank: "Belum ada riwayat absensi",
    //   listBar,
    // },
  ];

  useEffect(() => {
    const id = parseInt(absensiId);
    if (isNaN(id) || id <= 0) {
      navigate("/admin/absensi");
      return;
    }

    fetchDetail();
    document.title = "Detail Absensi - Admin Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Absensi</h2>
            <Link to="/admin/absensi">Kembali</Link>
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
