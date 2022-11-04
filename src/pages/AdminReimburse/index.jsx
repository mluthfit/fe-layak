import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as RequstedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { getExactElementByClass } from "../../scripts/element";
import style from "./style.module.css";
import axios from "axios";

const AdminReimburse = () => {
  const { state } = useLocation();
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

  const header = ["Nama", "Jabatan", "Kebutuhan"];
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
      const mappedData = data.map((reimburse) => {
        const temp =
          reimburse.status === "Pending" ? (
            <span className="requested">
              <RequstedIcon />
            </span>
          ) : reimburse.status === "Approved" ? (
            <span className="success">
              <ApprovedIcon />
            </span>
          ) : (
            <span className="danger">
              <DeclinedIcon />
            </span>
          );

        status.push(temp);
        href.push(`/admin/reimbursement/${reimburse.id}`);
        return {
          nama: reimburse.user.nama,
          jabatan: reimburse.user.position,
          kebutuhan: reimburse.kebutuhan,
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
      fetchData("/admin/reimbursement", setReqTable);
      fetchData("/admin/reimbursement/history", setHistoryTable);

      setLoading(false);
    })();

    document.title = "Permintaan Reimbursement - Admin Dashboard";
  }, []);

  return (
    <div className={`${style.adminReimburse} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Pengajuan Permintaan Reimbursement</h2>
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

export default AdminReimburse;
