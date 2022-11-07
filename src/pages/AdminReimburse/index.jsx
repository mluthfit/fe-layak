/* eslint-disable react-hooks/exhaustive-deps */
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
  const [newLoading, setNewLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [newSearch, setNewSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const resetFilterStatus = () => {
    const statusesEl = document.querySelectorAll(".status");
    statusesEl.forEach((el) => el.classList.remove(`${style.active}`));
  };

  const approveHandler = (e) => {
    resetFilterStatus();
    const el = getExactElementByClass(e.target, "status");
    if (filterStatus === "Approved") {
      setFilterStatus("");
      fetchFilterHistory(historySearch, "");
      el.classList.remove(`${style.active}`);
      return;
    }

    setFilterStatus("Approved");
    fetchFilterHistory(historySearch, "Approved");
    el.classList.add(`${style.active}`);
    return;
  };

  const declineHandler = (e) => {
    resetFilterStatus();
    const el = getExactElementByClass(e.target, "status");
    if (filterStatus === "Declined") {
      setFilterStatus("");
      fetchFilterHistory(historySearch, "");
      el.classList.remove(`${style.active}`);
      return;
    }

    setFilterStatus("Declined");
    fetchFilterHistory(historySearch, "Declined");
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

  const fetchTable = (api, setState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(api)
        .then(({ data: res }) => {
          mappingData(res.data, setState);
          resolve(`fetch ${api} success`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const mappingData = (data, setState) => {
    let [status, href] = [[], []];
    const mappedData = data?.map((reimburse) => {
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
      data: mappedData || [],
      status,
      href,
    });
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchTable("/admin/reimbursement", setReqTable),
        fetchTable("/admin/reimbursement/history", setHistoryTable),
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilterNew = async (value) => {
    setNewLoading(true);
    try {
      await fetchTable(`/admin/reimbursement?search=${value}`, setReqTable);
      setNewLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilterHistory = async (searchValue, statusValue) => {
    setHistoryLoading(true);
    try {
      await fetchTable(
        `/admin/reimbursement/history?search=${searchValue}${
          statusValue && `&status=${statusValue}`
        }`,
        setHistoryTable
      );
      setHistoryLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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
          <div className={style.new}>
            <div className={style.title}>
              <h3>Baru</h3>
              <div className={style.filter}>
                <input
                  type="text"
                  placeholder="Cari nama atau jabatan"
                  value={newSearch}
                  onChange={(e) => {
                    setNewSearch(e.target.value);
                    fetchFilterNew(e.target.value, filterStatus);
                  }}
                />
              </div>
            </div>
            {newLoading ? (
              <div className="center fillFlex">
                <Spinner type="admin" size={48} borderSize={5} />
              </div>
            ) : (
              <Table
                label={header}
                rows={reqTable.data}
                icon={{ label: "Status", element: reqTable.status }}
                href={reqTable.href}
              />
            )}
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
                <input
                  type="text"
                  placeholder="Cari nama atau jabatan"
                  value={historySearch}
                  onChange={(e) => {
                    setHistorySearch(e.target.value);
                    fetchFilterHistory(e.target.value, filterStatus);
                  }}
                />
              </div>
            </div>
            {historyLoading ? (
              <div className="center fillFlex">
                <Spinner type="admin" size={48} borderSize={5} />
              </div>
            ) : (
              <Table
                type="history"
                label={header}
                rows={historyTable.data}
                icon={{ label: "Status", element: historyTable.status }}
                href={historyTable.href}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReimburse;
