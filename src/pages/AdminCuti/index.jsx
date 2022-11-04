import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as RequstedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { getExactElementByClass } from "../../scripts/element";
import { toDateFormat } from "../../scripts/string";
import style from "./style.module.css";

const AdminCuti = () => {
  const { state } = useLocation();
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

  const header = ["Nama", "Jabatan", "Rentang Waktu"];
  const [reqTable, setReqTable] = useState({
    data: [],
    status: [],
    href: [],
  });

  const [historyTable, setHistoryTable] = useState({
    data: [],
    status: [],
    href: [],
  });

  const fetchData = async (api, setState) => {
    let [status, href] = [[], []];
    try {
      const {
        data: { data },
      } = await axios.get(api);
      const mappedData = data.map((cuti) => {
        const temp =
          cuti.status === "Pending" ? (
            <span className="requested">
              <RequstedIcon />
            </span>
          ) : cuti.status === "Approved" ? (
            <span className="success">
              <ApprovedIcon />
            </span>
          ) : (
            <span className="danger">
              <DeclinedIcon />
            </span>
          );

        status.push(temp);
        href.push(`/admin/cuti/${cuti.id}`);
        return {
          nama: cuti.user.nama,
          jabatan: cuti.user.position,
          rentang_waktu: `${toDateFormat(cuti.start_date)} - ${toDateFormat(
            cuti.end_date
          )}`,
        };
      });

      setState({
        data: mappedData,
        status,
        href,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (() => {
      fetchData("/admin/leaves", setReqTable);
      fetchData("/admin/leaves/history", setHistoryTable);

      setLoading(false);
    })();

    document.title = "Permintaan Cuti - Admin Dashboard";
  }, []);

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
          {state?.message && (
            <div className={`${style.flashMessage} ${state?.type}`}>
              {state.message}
            </div>
          )}
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
              label={header}
              rows={reqTable.data}
              icon={{ label: "Status", element: reqTable.status }}
              href={reqTable.href}
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
              type="history"
              label={header}
              rows={historyTable.data}
              icon={{ label: "Status", element: historyTable.status }}
              href={historyTable.href}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCuti;
