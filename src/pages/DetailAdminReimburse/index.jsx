import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Detail from "../../components/Detail";
import RequestAction from "../../components/RequestAction";
import Spinner from "../../components/Spinner";
import {
  hideBackgroundModal,
  showBackgroundModal,
} from "../../scripts/backgroundModal";
import style from "./style.module.css";

const DetailAdminReimburse = () => {
  const params = useParams();
  console.log(params.reimbursementId);

  const [loading, setLoading] = useState(true);
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    document.title = "Detail Permintaan Reimbursement - Admin Dashboard";
  }, []);

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

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Detail Permintaan Reimbursement</h2>
            <div className={style.actions}>
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
              <Link to="/admin/reimbursement" className="requested">
                Kembali
              </Link>
            </div>
          </div>
          {approveModal && (
            <RequestAction
              type="approve"
              backHandle={toggleApproveModal}
              withInputFile={true}
            />
          )}
          {declineModal && (
            <RequestAction type="decline" backHandle={toggleDeclineModal} />
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
