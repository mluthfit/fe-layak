import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import Detail from "../../components/Detail";
import Spinner from "../../components/Spinner";
import { toDateFormat, toCurrencyID } from "../../scripts/string";
import style from "./style.module.css";

const DetailUserReimburse = () => {
  const { reimburseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(
    {
      name: "",
      position: "",
      email: "",
      kebutuhan: "",
      dana: "",
      date: "",
      proof: "",
      reimburse: "",
      status: "",
      reason_declined: "-",
    }
  );

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
      title: "Tanggal Bergabung",
      value: detail.date,
      type: "text",
    },
    {
      title: "Kebutuhan",
      value: detail.kebutuhan,
      type: "text",
    },
    {
      title: "Jumlah Dana",
      value: detail.dana,
      type: "text",
    },
    {
      title: "Waktu Pemakaian Dana",
      value: detail.date,
      type: "text",
    },
    {
      title: "Bukti Pemakaian Dana Pribadi",
      value: "Unduh Bukti",
      type: "link",
      href: detail.proof,
    },
    {
      title: "Status",
      value: detail.status,
      type: "text",
      fontColor:
        detail.status === "Approved" ? "success"
        : detail.status === "Declined" ? "danger"
        : "",
    },
    {
      title: "Alasan Jika Ditolak",
      value: detail.reason_declined || "-",
      type: "text",
      fontSize: "small",
    },
  ];

  const fetchData = async() => {
    try {
      const { data: response} = await axios.get(
        `/reimbursement/${reimburseId}`
      );

      if (response.success === "false") {
        navigate("/dashboard/reimbursement");
        throw response.messages;
      }

      setDetail({
        name: response.data.user.nama,
        position: response.data.user.position,
        email: response.data.user.email,
        kebutuhan: response.data.kebutuhan,
        dana: toCurrencyID(response.data.jumlah_uang),
        date: toDateFormat(response.data.tanggal_pembayaran),
        proof: response.data.bukti_pembayaran,
        reimburse: response.data.bukti_reimburse,
        status: response.data.status,
        reason_declined: response.data.alasan_ditolak,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const id = parseInt(reimburseId);
    if (isNaN(id) || id <= 0){
      navigate("/dashboard/reimbursement");
      return;
    }

    fetchData();
    document.title = "Detail Reimbursement - Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Reimbursement</h2>
            <Link to="/dashboard/reimbursement">Kembali</Link>
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
