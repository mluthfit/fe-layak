import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-right.svg";
import Spinner from "../../components/Spinner";
import "./style.css";

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
    while (!el.classList.contains("radioContainer")) {
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

  return (
    <div className={`userCuti ${loading ? `center` : ""}`}>
      {loading ? (
        <Spinner size={48} borderSize={5} />
      ) : (
        <>
          <h2>Pengajuan Cuti</h2>
          <div className="mainCuti">
            <div className="form">
              <h3>Buat Pengajuan Baru</h3>
              <div className="sisaCuti">
                <span className="label">Sisa Cuti</span>
                <span className="value">10 Hari</span>
              </div>
              <form onSubmit={submitHandle}>
                <div className="formGroup">
                  <label htmlFor="radioCatGroup">Kategori</label>
                  <div id="radioCatGroup" className="radioCatGroup">
                    <div
                      className="radioContainer"
                      onClick={radioContainerHandle}
                    >
                      <input type="radio" value="sakit" name="radioCategory" />
                      <span>Sakit</span>
                    </div>
                    <div
                      className="radioContainer"
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
                      className="radioContainer"
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
                      className="radioContainer"
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
                <div className="formGroup">
                  <label htmlFor="time">Rentang Waktu</label>
                  <div id="time" className="time">
                    <input type="date" />
                    <ArrowIcon />
                    <input type="date" />
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="description">Deskripsi</label>
                  <textarea
                    id="description"
                    className="description"
                    placeholder="Masukkan deskripsi cuti dan alasannya"
                  ></textarea>
                </div>
                <div className="formGroup">
                  <label htmlFor="uploadDocument">Unggah Dokumen Cuti</label>
                  <input type="file" id="uploadDocument" />
                </div>
                <button type="submit" className="submitForm">
                  Ajukan
                </button>
              </form>
            </div>
            <div className="right"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCuti;
