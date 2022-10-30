import React, { useState, useEffect } from "react";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as RequstedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { getExactElementByClass } from "../../scripts/element";
import style from "./style.module.css";

const AdminReimburse = () => {
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const resetFilterStatus = () => {
    const statusesEl = document.querySelectorAll(".status");
    statusesEl.forEach((el) => el.classList.remove(`${style.active}`));
  };

  const approveHandler = (e) => {
    resetFilterStatus();
    const el = getExactElementByClass(e.target, "status");
    if (filterStatus === "approved") {
      setFilterStatus("all");
      el.classList.remove(`${style.active}`);
      return;
    }

    setFilterStatus("approved");
    el.classList.add(`${style.active}`);
    return;
  };

  const declineHandler = (e) => {
    resetFilterStatus();
    const el = getExactElementByClass(e.target, "status");
    if (filterStatus === "declined") {
      setFilterStatus("all");
      el.classList.remove(`${style.active}`);
      return;
    }

    setFilterStatus("declined");
    el.classList.add(`${style.active}`);
    return;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    document.title = "Permintaan Reimbursement - Admin Dashboard";
  }, []);

  const rowsDone = [
    {
      nama: "Ahmad Sumandi Wijayakarto",
      jabatan: "IT Architecture",
      kebutuhan: "Makan Siang",
    },
    {
      nama: "Angkara Messi",
      jabatan: "Cleaning Service",
      kebutuhan: "Operasional",
    },
  ];

  const hrefDone = ["/admin/reimbursement/1", "/admin/reimbursement/2"];
  const statusNew = [
    <span className="requested">
      <RequstedIcon />
    </span>,
    <span className="requested">
      <RequstedIcon />
    </span>,
  ];

  const statusHistory = [
    <span className="danger">
      <DeclinedIcon />
    </span>,
    <span className="success">
      <ApprovedIcon />
    </span>,
  ];

  return (
    <div className={`${style.adminReimburse} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Pengajuan Permintaan Reimbursement</h2>
          </div>
          <div>
            <div className={style.title}>
              <h3>Baru</h3>
              <div className={style.filter}>
                <input type="text" placeholder="Cari nama atau jabatan" />
              </div>
            </div>
            <Table
              rows={rowsDone}
              iconLabel="Status"
              icons={statusNew}
              href={hrefDone}
            />
          </div>
          <div className={style.history}>
            <div className={style.title}>
              <h3>Riwayat</h3>
              <div className={style.filter}>
                <button
                  className={`${style.button} red status`}
                  onClick={declineHandler}
                >
                  <DeclinedIcon />
                </button>
                <button
                  className={`${style.button} green status`}
                  onClick={approveHandler}
                >
                  <ApprovedIcon />
                </button>
                <input type="text" placeholder="Cari nama atau jabatan" />
              </div>
            </div>
            <Table
              rows={rowsDone}
              iconLabel="Status"
              icons={statusHistory}
              href={hrefDone}
              isHistory={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReimburse;
