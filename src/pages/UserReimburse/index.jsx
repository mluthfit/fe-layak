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
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({
    kebutuhan: "",
    jumlah_uang: "",
    tanggal_pembayaran: "",
    bukti_pembayaran: "",
  });

  const [listReimburse, setListReimburse] = useState({
    requested: [],
    history: [],
  });

  const onResetFormCreate = (setState) => {
    setState({
      kebutuhan: "",
      jumlah_uang: "",
      tanggal_pembayaran: "",
      bukti_pembayaran: "",
    });
  };

  const [formCreateError, setFormCreateError] = useState({
    kebutuhan: "",
    jumlah_uang: "",
    tanggal_pembayaran: "",
    bukti_pembayaran: "",
  });

  const inputHandle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const onFormError = (error, setState) => {
    error.forEach(({ field, message }) => {
      setState((current) => ({
        ...current,
        [field]: message,
      }));
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    onResetFormCreate(setFormCreateError);

    try {
      const formData = new FormData();
      formData.append("bukti_pembayaran", data.bukti_pembayaran);
      formData.append("kebutuhan", data.kebutuhan);
      formData.append("jumlah_uang", data.jumlah_uang);
      formData.append("tanggal_pembayaran", data.tanggal_pembayaran);

      setShowProgress(true);
      await axios.post("/reimbursement", formData, {
        onUploadProgress: ({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        },
      });
      setShowProgress(false);
      onResetFormCreate(setData);
      setLoading(true);
      fetchData();
    } catch ({ response }) {
      console.log(response);
      setShowProgress(false);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormCreateError);
      }

      if (response.data?.messages) {
        setFormCreateError((current) => ({
          ...current,
          bukti_pembayaran: response.data.messages,
        }));
      }
    }
  };

  const fetchList = async (api, key) => {
    return new Promise((resolve, reject) => {
      axios
        .get(api)
        .then(({ data: { data: list } }) => {
          const mapped = mappingList(list);
          setListReimburse((current) => ({
            ...current,
            [key]: mapped,
          }));
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const mappingList = (data) => {
    const mapped = data.map((item) => ({
      link: `/dashboard/reimbursement/${item.id}`,
      title: `${item.kebutuhan}`,
      icons:
        item.status === "Pending" ? (
          <span className="requested">
            <RequestedIcon />
          </span>
        ) : item.status === "Approved" ? (
          <span className="success">
            <ApprovedIcon />
          </span>
        ) : (
          <span className="danger">
            <DeclinedIcon />
          </span>
        ),
    }));

    return mapped;
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchList("/reimbursement", "requested"),
        fetchList("/reimbursement/history", "history"),
      ]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
                  {formCreateError.kebutuhan && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.kebutuhan}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="dana">Jumlah Dana</label>
                  <div className={style.fund}>
                    <span className={style.fundLabel}>Rp</span>
                    <input
                      onChange={(e) => inputHandle(e)}
                      type="number"
                      id="jumlah_uang"
                      className={style.fundInput}
                    />
                  </div>
                  {formCreateError.jumlah_uang && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.jumlah_uang}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="date">Tanggal Pembayaran</label>
                  <input
                    onChange={(e) => inputHandle(e)}
                    type="date"
                    id="tanggal_pembayaran"
                    max={new Date().toISOString().split("T")[0]}
                    className={style.paymentDate}
                  />
                  {formCreateError.tanggal_pembayaran && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.tanggal_pembayaran}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="proof">Unggah Bukti</label>
                  {showProgress && (
                    <div className={style.uploadBar}>
                      <div
                        className={style.progress}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                  <input
                    onChange={(e) =>
                      setData({
                        ...data,
                        bukti_pembayaran: e.target.files[0],
                      })
                    }
                    type="file"
                    id="bukti_pembayaran"
                    className={style.uploadProof}
                  />
                  {formCreateError.bukti_pembayaran && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.bukti_pembayaran}
                    </div>
                  )}
                </div>
                {showProgress ? (
                  <>
                    <div>
                      <p>Uploading : {progress} %</p>
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
                listRequested={listReimburse.requested}
                listHistory={listReimburse.history}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserReimburse;
