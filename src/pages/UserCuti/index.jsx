import React, { useEffect, useState } from "react";
import ListRequest from "../../components/ListRequest";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import Spinner from "../../components/Spinner";
import style from "./style.module.css";

const UserCuti = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const rootCS = getComputedStyle(document.querySelector(":root"));
  const checkedColor = rootCS.getPropertyValue("--primary-300");
  const notCheckedColor = rootCS.getPropertyValue("--secondary-300");

  const radioContainerHandle = (e) => {
    let el = e.target;
    while (!el.classList.contains(`${style.radioContainer}`)) {
      el = el.parentNode;
    }

    radioStyleReset();
    el.style.borderColor = checkedColor;
    el.querySelector("input").checked = true;
  };

  const radioStyleReset = () => {
    const radioContainers = document.querySelectorAll(".radioContainer");
    radioContainers.forEach((el) => (el.style.borderColor = notCheckedColor));
  };

  const submitHandle = (e) => {
    e.preventDefault();
  };

  const listRequested = [
    {
      link: "/dashboard/cuti/1",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className={style.requested}>
            <RequestedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/cuti/2",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className={style.requested}>
            <RequestedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/cuti/3",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className={style.requested}>
            <RequestedIcon />
          </span>
        </>
      ),
    },
  ];

  const listHistory = [
    {
      link: "/dashboard/cuti/1",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className={style.danger}>
            <DeclinedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/cuti/2",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className={style.danger}>
            <DeclinedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/cuti/3",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className={style.success}>
            <ApprovedIcon />
          </span>
        </>
      ),
    },
  ];

  return (
    <div className={`${style.userCuti} ${loading ? `${style.center}` : ""}`}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Pengajuan Cuti</h2>
            <a
              href="/downloads/template-dokumen-cuti.docx"
              rel="noopener noreferrer"
              target="_blank"
            >
              Template Dokumen Cuti
            </a>
          </div>
          <div className={style.mainCuti}>
            <div className={style.form}>
              <h3>Buat Pengajuan Baru</h3>
              <div className={style.sisaCuti}>
                <span className={style.label}>Sisa Cuti</span>
                <span className={style.value}>10 Hari</span>
              </div>
              <form onSubmit={submitHandle}>
                <div className={style.formGroup}>
                  <label htmlFor="radioCatGroup">Kategori</label>
                  <div id="radioCatGroup" className={style.radioCatGroup}>
                    <div
                      className={style.radioContainer}
                      onClick={radioContainerHandle}
                    >
                      <input type="radio" value="sakit" name="radioCategory" />
                      <span>Sakit</span>
                    </div>
                    <div
                      className={style.radioContainer}
                      onClick={radioContainerHandle}
                    >
                      <input
                        type="radio"
                        value="penting"
                        name="radioCategory"
                      />
                      <span>Penting</span>
                    </div>
                    <div
                      className={style.radioContainer}
                      onClick={radioContainerHandle}
                    >
                      <input
                        type="radio"
                        value="hamil/melahirkan"
                        name="radioCategory"
                      />
                      <span>Hamil</span>
                    </div>
                    <div
                      className={style.radioContainer}
                      onClick={radioContainerHandle}
                    >
                      <input
                        type="radio"
                        value="lainnya"
                        name="radioCategory"
                      />
                      <span>Lainnya</span>
                    </div>
                  </div>
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="time">Rentang Waktu</label>
                  <div id="time" className={style.time}>
                    <input type="date" />
                    <ArrowIcon />
                    <input type="date" />
                  </div>
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="description">Deskripsi</label>
                  <textarea
                    id="description"
                    className={style.description}
                    placeholder="Masukkan deskripsi cuti dan alasannya"
                  ></textarea>
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="uploadDocument">Unggah Dokumen Cuti</label>
                  <input
                    type="file"
                    id="uploadDocument"
                    className={style.uploadDocument}
                  />
                </div>
                <button type="submit" className={style.submitForm}>
                  Ajukan
                </button>
              </form>
            </div>
            <div className={style.listCuti}>
              <ListRequest
                title="List Pengajuan Cuti"
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

export default UserCuti;
