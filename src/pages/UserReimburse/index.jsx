/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import ListRequest from "../../components/ListRequest";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";

const UserReimburse = () => {
  const [loading, setLoading] = useState(true);
  const [proofPhoto, setProofPhoto] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({
    kebutuhan: "",
    dana: "",
    date: "",
    proof: "",
  });
  const [reqTable, setReqTable] = useState({
    link: [],
    title: [],
    icons: [],
  });

  const [hisTable, setHisTable] = useState({
    link: [],
    title: [],
    icons: [],
  });

  const inputHandle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bukti_pembayaran", proofPhoto);
      formData.append("kebutuhan", data.kebutuhan);
      formData.append("jumlah_uang", data.dana);
      formData.append("tanggal_pembayaran", data.date);

      setShowProgressBar(true);
      const { data: response } = await axios.post("/reimbursement", formData, {
        onUploadProgress: ({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        },
      });
      setShowProgressBar(false);
    } catch ({ response }) {
      console.log(response);
    }
  };

  const fetchTable = async (api, setState) => {
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
    let [icons, link] = [[], []];

    const mappedData = data?.map((reimburse) => {
      const temp =
        reimburse.status === "Pending" ? (
          <span className="requested">
            <RequestedIcon />
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

      icons.push(temp);
      link.push(`/reimbursement/${reimburse.id}`);
      return {
        kebutuhan: reimburse.kebutuhan,
      };
    });

    setState({
      title: mappedData,
      icons,
      link,
    });
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchTable("/reimbursement", setReqTable),
        fetchTable("/reimbursement/history", setHisTable),
      ]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // const listRequested = [
  //   Object.keys(reqTable).map((items, i) => {
  //     return {
  //       link: reqTable[items],
  //     }
  //   })
  // ];

  const listRequested = [
    {
      link: "/dashboard/reimbursement/6",
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
      link: "/dashboard/reimbursement/7",
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
      link: "/dashboard/reimbursement/8",
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
      link: "/dashboard/reimbursement/5",
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

  useEffect(() => {
    fetchData();
    document.title = "Pengajuan Reimbursement - Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
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
                  <label htmlFor="kebutuhan">Kebutuhan</label>
                  <textarea
                    onChange={(e) => inputHandle(e)}
                    id="kebutuhan"
                    className={style.need}
                    placeholder="Masukkan kebutuhan pembelian"
                  ></textarea>
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="dana">Jumlah Dana</label>
                  <div className={style.fund}>
                    <span className={style.fundLabel}>Rp</span>
                    <input
                      onChange={(e) => inputHandle(e)}
                      type="number"
                      id="dana"
                      className={style.fundInput}
                    />
                  </div>
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="date">Tanggal Pembayaran</label>
                  <input
                    onChange={(e) => inputHandle(e)}
                    type="date"
                    id="date"
                    className={style.paymentDate}
                  />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="proof">Unggah Bukti</label>
                  <input
                    onChange={(e) => setProofPhoto(e.target.files[0])}
                    type="file"
                    id="proof"
                    className={style.uploadProof}
                  />
                </div>
                {showProgressBar ? (
                  <>
                    <div>
                      <p>{progress}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
