import React, { useEffect, useState } from "react";
import ListRequest from "../../components/ListRequest";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";

const UserReimburse = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const submitHandle = (e) => {
    e.preventDefault();
  };

  const listRequested = [
    {
      link: "/dashboard/reimbursement/1",
      title: "Makan Siang",
      icons: (
        <>
          <span className="requested">
            <RequestedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/reimbursement/2",
      title: "Makan Siang",
      icons: (
        <>
          <span className="requested">
            <RequestedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/reimbursement/3",
      title: "Makan Siang",
      icons: (
        <>
          <span className="requested">
            <RequestedIcon />
          </span>
        </>
      ),
    },
  ];

  const listHistory = [
    {
      link: "/dashboard/reimbursement/1",
      title: "Makan Siang",
      icons: (
        <>
          <span className="danger">
            <DeclinedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/reimbursement/2",
      title: "Makan Siang",
      icons: (
        <>
          <span className="danger">
            <DeclinedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/reimbursement/3",
      title: "Makan Siang",
      icons: (
        <>
          <span className="success">
            <ApprovedIcon />
          </span>
        </>
      ),
    },
  ];

  return (
    <div className={`${style.userReimburse} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Pengajuan Reimbursement</h2>
          </div>
          <div className={style.mainReimburse}>
            <div className={style.form}>
              <h3>Buat Pengajuan Baru</h3>
              <form onSubmit={submitHandle}>
                <div className={style.formGroup}>
                  <label htmlFor="need">Kebutuhan</label>
                  <textarea
                    id="need"
                    className={style.need}
                    placeholder="Masukkan kebutuhan pembelian"
                  ></textarea>
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="fund">Jumlah Dana</label>
                  <div className={style.fund}>
                    <span className={style.fundLabel}>Rp</span>
                    <input
                      type="number"
                      id="fund"
                      className={style.fundInput}
                    />
                  </div>
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="paymentDate">Tanggal Pembayaran</label>
                  <input
                    type="date"
                    id="paymentDate"
                    className={style.paymentDate}
                  />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="uploadProof">Unggah Bukti</label>
                  <input
                    type="file"
                    id="uploadProof"
                    className={style.uploadProof}
                  />
                </div>
                <button type="submit" className={style.submitForm}>
                  Ajukan
                </button>
              </form>
            </div>
            <div className={style.listReimburse}>
              <ListRequest
                title="List Pengajuan Reimbursement"
                listRequested={listRequested}
                listHistory={listHistory}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserReimburse;
