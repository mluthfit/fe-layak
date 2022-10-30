import React, { useState, useEffect } from "react";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as RequstedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { getExactElementByClass } from "../../scripts/element";
import style from "./style.module.css";

const AdminCuti = () => {
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const toggleDateHandler = (e) => {
    let el = getExactElementByClass(e.target, `${style.button}`);
    el.classList.toggle(`${style.active}`);

    setFilterDate(!filterDate);
  };

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

  const openFileInputHandler = (e) => {
    const fileInput = e.target.parentNode.querySelector("#fileInput");
    fileInput.click();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    document.title = "Permintaan Cuti - Admin Dashboard";
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
    <div className={`${style.adminCuti} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Pengajuan Permintaan Cuti</h2>
            <div className={style.template}>
              <button className={style.button} onClick={openFileInputHandler}>
                Reupload Template
              </button>
              <a href="/download" target="_blank" rel="noopener noreferrer">
                <DownloadIcon width={"20px"} />
              </a>
              <input type="file" id="fileInput" />
            </div>
          </div>
          <div>
            <div className={style.title}>
              <h3>Baru</h3>
              <div className={style.filter}>
                <button
                  className={`${style.button} ${style.blue}`}
                  onClick={toggleDateHandler}
                >
                  <CalendarIcon />
                </button>
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
                <button
                  className={`${style.button} ${style.blue}`}
                  onClick={toggleDateHandler}
                >
                  <CalendarIcon />
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

export default AdminCuti;
