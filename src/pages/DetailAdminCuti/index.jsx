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

const DetailAdminCuti = () => {
  const params = useParams();
  console.log(params.cutiId);

  const [loading, setLoading] = useState(true);
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    document.title = "Detail Permintaan Cuti - Admin Dashboard";
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
      value: "Diajukan",
      type: "text",
    },
    {
      title: "Alasan Jika Ditolak",
      value:
        "Rentang waktu yang diusulkan tidak dapat diterima karena perusahaan membutuhkan produksi besar",
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
            <h2>Detail Permintaan Cuti</h2>
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
              <Link to="/admin/cuti" className="requested">
                Kembali
              </Link>
            </div>
          </div>
          {approveModal && (
            <RequestAction type="approve" backHandle={toggleApproveModal} />
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

export default DetailAdminCuti;
