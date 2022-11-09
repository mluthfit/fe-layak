/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import ListRequest from "../../components/ListRequest";
import Spinner from "../../components/Spinner";
import { getStyle } from "../../scripts/rootStyle";
import { toDateFormat } from "../../scripts/string";
import style from "./style.module.css";

const UserCuti = () => {
  const [loading, setLoading] = useState(true);
  const checkedColor = getStyle("--primary-300");
  const notCheckedColor = getStyle("--secondary-300");
  const storageUrl = process.env.REACT_APP_STORAGE_URL;

  const [formCreate, setFormCreate] = useState({
    tipe_cuti: "",
    start_date: "",
    end_date: "",
    deskripsi: "",
    surat_cuti: "",
  });

  const [formCreateError, setFormCreateError] = useState({
    tipe_cuti: "",
    start_date: "",
    end_date: "",
    deskripsi: "",
    surat_cuti: "",
  });

  const onResetFormCreate = (setState) => {
    setState({
      tipe_cuti: "",
      start_date: "",
      end_date: "",
      deskripsi: "",
      surat_cuti: "",
    });
  };

  const onChangeHandler = (setState, key, value) => {
    setState((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const radioContainerHandle = (e) => {
    let el = e.target;
    while (!el.classList.contains(`${style.radioContainer}`)) {
      el = el.parentNode;
    }

    radioStyleReset();
    el.style.borderColor = checkedColor;

    const radio = el.querySelector("input");
    radio.checked = true;
    setFormCreate((current) => ({
      ...current,
      tipe_cuti: radio.value,
    }));
  };

  const radioStyleReset = () => {
    const radioContainers = document.querySelectorAll(
      `.${style.radioContainer}`
    );
    radioContainers.forEach((el) => (el.style.borderColor = notCheckedColor));
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
      Object.keys(formCreate).forEach((key) =>
        formData.append(key, formCreate[key])
      );
      await axios.post("/leaves", formData);
      onResetFormCreate(setFormCreate);

      setLoading(true);
      fetchData();
    } catch ({ response }) {
      console.log(response);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormCreateError);
      }
    }
  };

  const [user, setUser] = useState({
    templateCuti: "",
    sisaCuti: 0,
  });

  const [listCuti, setListCuti] = useState({
    requested: [],
    history: [],
  });

  const mappingList = (data) => {
    const mapped = data.map((item) => ({
      link: `/dashboard/cuti/${item.id}`,
      title: `${toDateFormat(item.start_date)} - ${toDateFormat(
        item.end_date
      )}`,
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

  const fetchUser = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/leaves/download-template-surat-cuti")
        .then(({ data: { data: user } }) => {
          setUser({
            templateCuti: user.company.template_surat_cuti,
            sisaCuti: user.sisa_cuti,
          });
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  const fetchList = (api, key) => {
    return new Promise((resolve, reject) => {
      axios
        .get(api)
        .then(({ data: { data: list } }) => {
          const mapped = mappingList(list);
          setListCuti((current) => ({
            ...current,
            [key]: mapped,
          }));
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchUser(),
        fetchList("/leaves", "requested"),
        fetchList("/leaves/history", "history"),
      ]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = "Pengajuan Cuti - Dashboard";
  }, []);

  return (
    <div className={loading ? "center" : ""}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.header}>
            <h2>Pengajuan Cuti</h2>
            {user.templateCuti && (
              <a
                href={`${storageUrl}/${user.templateCuti}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Template Dokumen Cuti
              </a>
            )}
          </div>
          <div className={style.mainCuti}>
            <div className={style.form}>
              <h3>Buat Pengajuan Baru</h3>
              <div className={style.sisaCuti}>
                <span className={style.label}>Sisa Cuti</span>
                <span className={style.value}>{user.sisaCuti} Hari</span>
              </div>
              <form onSubmit={submitHandle}>
                <div className={style.formGroup}>
                  <label htmlFor="radioCatGroup">Kategori</label>
                  <div id="radioCatGroup" className={style.radioCatGroup}>
                    <div
                      className={style.radioContainer}
                      onClick={radioContainerHandle}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <input type="radio" value="Sakit" name="radioCategory" />
                      <span>Sakit</span>
                    </div>
                    <div
                      className={style.radioContainer}
                      onClick={radioContainerHandle}
                    >
                      <input
                        type="radio"
                        value="Penting"
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
                        value="Hamil/melahirkan"
                        name="radioCategory"
                      />
                      <span>Hamil/melahirkan</span>
                    </div>
                    <div
                      className={style.radioContainer}
                      onClick={radioContainerHandle}
                    >
                      <input
                        type="radio"
                        value="Lainnya"
                        name="radioCategory"
                      />
                      <span>Lainnya</span>
                    </div>
                  </div>
                  {formCreateError.tipe_cuti && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.tipe_cuti}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="time">Rentang Waktu</label>
                  <div id="time" className={style.time}>
                    <input
                      type="date"
                      value={formCreate.start_date}
                      onChange={(e) =>
                        onChangeHandler(
                          setFormCreate,
                          "start_date",
                          e.target.value
                        )
                      }
                    />

                    <ArrowIcon />
                    <input
                      type="date"
                      value={formCreate.end_date}
                      onChange={(e) =>
                        onChangeHandler(
                          setFormCreate,
                          "end_date",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  {formCreateError.start_date && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.start_date}
                    </div>
                  )}
                  {formCreateError.end_date && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.end_date}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="description">Deskripsi</label>
                  <textarea
                    id="description"
                    className={style.description}
                    placeholder="Masukkan deskripsi cuti dan alasannya"
                    value={formCreate.deskripsi}
                    onChange={(e) =>
                      onChangeHandler(
                        setFormCreate,
                        "deskripsi",
                        e.target.value
                      )
                    }
                  ></textarea>
                  {formCreateError.deskripsi && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.deskripsi}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="uploadDocument">Unggah Dokumen Cuti</label>
                  <input
                    type="file"
                    id="uploadDocument"
                    className={style.uploadDocument}
                    onChange={(e) =>
                      onChangeHandler(
                        setFormCreate,
                        "surat_cuti",
                        e.target.files[0]
                      )
                    }
                  />
                  {formCreateError.surat_cuti && (
                    <div className={`${style.flash} danger`}>
                      {formCreateError.surat_cuti}
                    </div>
                  )}
                </div>
                <button type="submit" className={style.submitForm}>
                  Ajukan
                </button>
              </form>
            </div>
            <div className={style.listCuti}>
              <ListRequest
                title="List Pengajuan Cuti"
                listRequested={listCuti.requested}
                listHistory={listCuti.history}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCuti;
