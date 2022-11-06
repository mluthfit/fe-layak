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
          resolve(`fetch ${api} success`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const fetchData = async () => {
    try {
      await axios.get("/admin/presences/yet");
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

  return (
    <div className={`${style.adminAbsensi} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <h2>Status Absensi Hari Ini</h2>
          <div>
            <div className={style.title}>
              <h3>Sudah Absensi</h3>
              <input type="text" placeholder="Cari nama atau jabatan" />
            </div>
            <Table
              label={header}
              rows={yetTable.data}
              icon={{ label: "Status", element: yetTable.status }}
              href={yetTable.href}
            />
          </div>
          <div className={style.history}>
            <div className={style.title}>
              <h3>Belum Melakukan Absensi</h3>
              <input type="text" placeholder="Cari nama atau jabatan" />
            </div>
            <Table
              type="history"
              label={header}
              rows={notYetTable.data}
              icon={{ label: "Status", element: notYetTable.status }}
              href={notYetTable.href}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAbsensi;
