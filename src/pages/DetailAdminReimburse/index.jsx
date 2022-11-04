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
import { toDateFormat, toCurrencyID } from "../../scripts/string";
import style from "./style.module.css";

const DetailAdminReimburse = () => {
  const { reimbursementId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [declinedReason, setDeclinedReason] = useState("");
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [reimbursePhoto, setReimbursePhoto] = useState(null);

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
      const formData = new FormData();
      formData.append("status", "Approved");
      formData.append("bukti_reimburse", reimbursePhoto);

      const { data: response } = await axios.put(
        `/admin/reimbursement/${reimbursementId}`,
        formData
      );

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

    toggleApproveModal();
  };

  const declinedHandler = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.put(
        `/admin/reimbursement/${reimbursementId}`,
        {
          status: "Declined",
          alasan_ditolak: declinedReason,
        }
      );

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
    kebutuhan: "",
    dana: "",
    date: "",
    proof: "",
    reimburse: "",
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
      title: "Bukti Pengembalian Dana",
      value: "Unduh Reimburse",
      type: "link",
      href: detail.reimburse,
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
      const { data: response } = await axios.get(
        `/admin/reimbursement/${reimbursementId}`
      );

      if (response.success === "false") {
        navigate("/admin/reimbursement");
        throw response.messages;
      }

      setDetail({
        name: response.data.user.nama,
        position: response.data.user.position,
        email: response.data.user.email,
        kebutuhan: response.data.kebutuhan,
        dana: toCurrencyID(response.data.jumlah_uang),
        date: toDateFormat(response.data.tanggal_pembayaran),
        proof: `${process.env.REACT_APP_STORAGE_URL}/${response.data.bukti_pembayaran}`,
        reimburse: `${process.env.REACT_APP_STORAGE_URL}/${response.data.bukti_reimburse}`,
        status: response.data.status,
        reason_declined: response.data.alasan_ditolak,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = parseInt(reimbursementId);
    if (isNaN(id) || id <= 0) {
      navigate("/admin/reimbursement");
      return;
    }

    fetchDetail();
    document.title = "Detail Permintaan Reimbursement - Admin Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Permintaan Reimbursement</h2>
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
              <Link to="/admin/reimbursement" className="requested">
                Kembali
              </Link>
            </div>
          </div>
          {approveModal && (
            <RequestAction
              type="approve"
              title="Upload Bukti Pengembalian Dana"
              state={{ get: reimbursePhoto, set: setReimbursePhoto }}
              submitHandle={approveHandler}
              backHandle={toggleApproveModal}
              withInputFile={true}
            />
          )}
          {declineModal && (
            <RequestAction
              title="Alasan Menolak Permintaan"
              type="decline"
              state={{ get: declinedReason, set: setDeclinedReason }}
              backHandle={toggleDeclineModal}
              submitHandle={declinedHandler}
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

export default DetailAdminReimburse;
