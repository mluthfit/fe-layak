/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Detail from "../../components/Detail";
import RequestAction from "../../components/RequestAction";
import Spinner from "../../components/Spinner";
import {
  hideBackgroundModal,
  showBackgroundModal,
} from "../../scripts/backgroundModal";
import { toDateFormat } from "../../scripts/string";
import style from "./style.module.css";

const DetailAdminCuti = () => {
  const { cutiId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [declinedReason, setDeclinedReason] = useState("");
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);

  const toggleApproveModal = () => {
    const mainbar = document.querySelector("#mainbar");
    if (approveModal) {
      hideBackgroundModal(mainbar);
      setApproveModal(false);
      return;
    }

    showBackgroundModal(mainbar);
    setApproveModal(true);
  };

  const toggleDeclineModal = () => {
    const mainbar = document.querySelector("#mainbar");
    if (declineModal) {
      hideBackgroundModal(mainbar);
      setDeclineModal(false);
      return;
    }

    showBackgroundModal(mainbar);
    setDeclineModal(true);
  };

  const approveHandler = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.put(`/admin/leaves/${cutiId}`, {
        status: "Approved",
      });

      if (response.success === "false") {
        throw response.messages;
      }

      setLoading(true);
      fetchDetail();
    } catch (error) {
      navigate("/admin/cuti", {
        replace: true,
        state: { type: "danger", message: error },
      });
    }

    toggleApproveModal();
  };

  const declinedHandler = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.put(`/admin/leaves/${cutiId}`, {
        status: "Declined",
        alasan_ditolak: declinedReason,
      });

      if (response.success === "false") {
        throw response.messages;
      }

      setLoading(true);
      fetchDetail();
    } catch (error) {
      navigate("/admin/reimbursement", {
        replace: true,
        state: { type: "danger", message: error },
      });
    }

    toggleDeclineModal();
  };

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
      const { data: response } = await axios.get(`/admin/leaves/${cutiId}`);

      if (response.success === "false") {
        navigate("/admin/cuti");
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
        dokumen: `${process.env.REACT_APP_STORAGE_URL}/${response.data.surat_cuti}`,
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
      navigate("/admin/cuti");
      return;
    }

    fetchDetail();
    document.title = "Detail Permintaan Cuti - Admin Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Permintaan Cuti</h2>
            <div className={style.actions}>
              {detail.status === "Pending" && (
                <>
                  <button
                    className={`success ${style.approve}`}
                    onClick={toggleApproveModal}
                  >
                    Terima
                  </button>
                  <button
                    className={`danger ${style.decline}`}
                    onClick={toggleDeclineModal}
                  >
                    Tolak
                  </button>
                </>
              )}
              <Link to="/admin/cuti" className="requested">
                Kembali
              </Link>
            </div>
          </div>
          {approveModal && (
            <RequestAction
              title="Konfirmasi Permintaan"
              type="approve"
              submitHandle={approveHandler}
              backHandle={toggleApproveModal}
            />
          )}
          {declineModal && (
            <RequestAction
              title="Alasan Menolak Permintaan"
              type="decline"
              state={{ get: declinedReason, set: setDeclinedReason }}
              submitHandle={declinedHandler}
              backHandle={toggleDeclineModal}
            />
          )}
          <div className={style.detail}>
            <Detail lists={lists} />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailAdminCuti;
