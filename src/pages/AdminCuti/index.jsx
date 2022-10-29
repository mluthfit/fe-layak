import React, { useState, useEffect } from "react";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as RequstedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import "./style.css";
import { getExactElementByClass } from "../../scripts/element";

const AdminCuti = () => {
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const toggleDateHandler = (e) => {
    let el = getExactElementByClass(e.target, "button");
    el.classList.toggle("active");

    setFilterDate(!filterDate);
  };

  const resetFilterStatus = () => {
    const statusesEl = document.querySelectorAll(".status");
    statusesEl.forEach((el) => el.classList.remove("active"));
  };

  const approveHandler = (e) => {
    resetFilterStatus();
    const el = getExactElementByClass(e.target, "status");
    if (filterStatus === "approved") {
      setFilterStatus("all");
      el.classList.remove("active");
      return;
    }

    setFilterStatus("approved");
    el.classList.add("active");
    return;
  };

  const declineHandler = (e) => {
    resetFilterStatus();
    const el = getExactElementByClass(e.target, "status");
    if (filterStatus === "declined") {
      setFilterStatus("all");
      el.classList.remove("active");
      return;
    }

    setFilterStatus("declined");
    el.classList.add("active");
    return;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    document.title = "Absensi - Admin Dashboard";
  }, []);

  const rowsDone = [
    {
      nama: "Ahmad Sumandi Wijayakarto",
      jabatan: "IT Architecture",
      rentang_waktu: "10 September 2022 - 15 September 2022",
    },
    {
      nama: "Angkara Messi",
      jabatan: "Cleaning Service",
      rentang_waktu: "1 Oktober 2022 - 2 Oktober 2022",
    },
  ];

  const hrefDone = ["/admin/cuti/1", "/admin/cuti/2"];
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
    <div className={`adminCuti ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className="header">
            <h2>Pengajuan Permintaan Cuti</h2>
            <div className="template">
              <button className="button">Upload Template</button>
              <a href="/download" target="_blank" rel="noopener noreferrer">
                <DownloadIcon width={"20px"} />
              </a>
            </div>
          </div>
          <div>
            <div className="title">
              <h3>Baru</h3>
              <div className="filter">
                <button className="button blue" onClick={toggleDateHandler}>
                  <CalendarIcon />
                </button>
                <input type="text" placeholder="Cari nama atau jabatan" />
              </div>
            </div>
            <Table rows={rowsDone} status={statusNew} href={hrefDone} />
          </div>
          <div className="history">
            <div className="title">
              <h3>Riwayat</h3>
              <div className="filter">
                <button className="button red status" onClick={declineHandler}>
                  <DeclinedIcon />
                </button>
                <button
                  className="button green status"
                  onClick={approveHandler}
                >
                  <ApprovedIcon />
                </button>
                <button className="button blue" onClick={toggleDateHandler}>
                  <CalendarIcon />
                </button>
                <input type="text" placeholder="Cari nama atau jabatan" />
              </div>
            </div>
            <Table
              rows={rowsDone}
              status={statusHistory}
              href={hrefDone}
              isHistory={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCuti;
