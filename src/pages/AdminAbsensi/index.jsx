/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import { toTimeFormat } from "../../scripts/string";
import style from "./style.module.css";

const AdminAbsensi = () => {
  const [loading, setLoading] = useState(true);
  const [newLoading, setNewLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [newSearch, setNewSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");

  const header = ["Nama", "Jabatan", "Jam Masuk"];
  const [yetTable, setYetTable] = useState({
    data: [],
    status: [],
    href: [],
  });

  const [notYetTable, setNotYetTable] = useState({
    data: [],
    status: [],
    href: [],
  });

  const mappingData = (data, setState) => {
    let [status, href] = [[], []];
    const mappedData = data?.map((absensi) => {
      const temp = (
        <>
          <span className={absensi.clock_in ? "success" : "danger"}>
            <ClockInIcon />
          </span>
          <span className={absensi.clock_out ? "success" : "danger"}>
            <ClockOutIcon />
          </span>
        </>
      );

      status.push(temp);
      href.push(`/admin/absensi/${absensi.id}`);
      return {
        nama: absensi.user.nama,
        jabatan: absensi.user.position,
        jam_masuk: toTimeFormat(absensi.clock_in) || "-",
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
          console.log(res.data);
          resolve(`fetch ${api} success`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchTable("/admin/presences", setYetTable),
        fetchTable("/admin/presences/yet", setNotYetTable),
      ]);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = "Absensi - Admin Dashboard";
  }, []);

  const fetchNew = async () => {
    setNewLoading(true);
    try {
      await fetchTable(`/admin/presences?search=${newSearch}`, setYetTable);
      setNewLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      await fetchTable(
        `/admin/presences/yet?search=${historySearch}`,
        setNotYetTable
      );
      setHistoryLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${style.adminAbsensi} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <h2>Status Absensi Hari Ini</h2>
          <div className={style.new}>
            <div className={style.title}>
              <h3>Sudah Absensi</h3>
              <input
                type="text"
                placeholder="Cari nama atau jabatan"
                value={newSearch}
                onChange={(e) => {
                  setNewSearch(e.target.value);
                  fetchNew();
                }}
              />
            </div>
            {newLoading ? (
              <div className="center fillFlex">
                <Spinner type="admin" size={48} borderSize={5} />
              </div>
            ) : (
              <Table
                label={header}
                rows={yetTable.data}
                icon={{ label: "Status", element: yetTable.status }}
                href={yetTable.href}
              />
            )}
          </div>
          <div className={style.history}>
            <div className={style.title}>
              <h3>Belum Melakukan Absensi</h3>
              <input
                type="text"
                placeholder="Cari nama atau jabatan"
                value={historySearch}
                onChange={(e) => {
                  setHistorySearch(e.target.value);
                  fetchHistory();
                }}
              />
            </div>
            {historyLoading ? (
              <div className="center fillFlex">
                <Spinner type="admin" size={48} borderSize={5} />
              </div>
            ) : (
              <Table
                type="history"
                label={header}
                rows={notYetTable.data}
                icon={{ label: "Status", element: notYetTable.status }}
                href={notYetTable.href}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAbsensi;
