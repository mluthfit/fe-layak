/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
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
  const storageUrl = process.env.REACT_APP_STORAGE_URL;

  const [loading, setLoading] = useState(true);
  const [newLoading, setNewLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [newSearch, setNewSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [templateUrl, setTemplateUrl] = useState(null);

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

  const openFileInputHandler = (e) => {
    const fileInput = e.target.parentNode.querySelector("#fileInput");
    fileInput.click();
  };

  const submitTemplateHandler = async (file) => {
    try {
      const formData = new FormData();
      formData.append("template_surat_cuti", file);

      setShowProgressBar(true);
      await axios.put("/admin/leaves/upload-template-surat-cuti", formData, {
        onUploadProgress: ({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        },
      });
      setShowProgressBar(false);

      await fetchTemplate();
    } catch (error) {
      console.log(error);
    }
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

  const mappingData = (data, setState) => {
    let [status, href] = [[], []];
    const mappedData = data?.map((cuti) => {
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
      data: mappedData || [],
      status,
      href,
    });
  };

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

  const fetchTemplate = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/leaves/download-template-surat-cuti")
        .then(({ data: res }) => {
          setTemplateUrl(res.data.company?.template_surat_cuti);
          resolve("fetch template success");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchTable("/admin/leaves", setReqTable),
        fetchTable("/admin/leaves/history", setHistoryTable),
        fetchTemplate(),
      ]);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilterNew = async (value) => {
    setNewLoading(true);
    try {
      await fetchTable(`/admin/leaves?search=${value}`, setReqTable);
      setNewLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilterHistory = async (searchValue, statusValue) => {
    setHistoryLoading(true);
    try {
      await fetchTable(
        `/admin/leaves/history?search=${searchValue}${
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
    document.title = "Permintaan Cuti - Admin Dashboard";
  }, []);

  return (
    <div className={`${style.adminCuti} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <div className={style.main}>
              <h2>Pengajuan Permintaan Cuti</h2>
              <div className={style.template}>
                <button className={style.button} onClick={openFileInputHandler}>
                  {templateUrl ? "Reupload" : "Upload"} Template
                </button>
                {templateUrl && (
                  <a
                    href={`${storageUrl}/${templateUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon width={"20px"} />
                  </a>
                )}
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => submitTemplateHandler(e.target.files[0])}
                />
              </div>
            </div>
            {showProgressBar && (
              <div className={style.uploadBar}>
                <div
                  className={style.progress}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
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
                    fetchFilterNew(e.target.value);
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

export default AdminCuti;
