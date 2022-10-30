import React, { useState, useEffect } from "react";
import { ReactComponent as EditIcon } from "../../assets/icons/pencil.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import FormUpdate from "../../components/FormUpdate";
import RequestAction from "../../components/RequestAction";
import {
  hideBackgroundModal,
  showBackgroundModal,
} from "../../scripts/backgroundModal";
import style from "./style.module.css";

const SuperAdminAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [showCreateAcc, setShowCreateAcc] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    document.title = "Administator - Dev Dashboard";
  }, []);

  const rows = [
    {
      nama: "Ahmad Sumandi Wijayakarto",
      jabatan: "IT Architecture",
      email: "ahmad@ankara.id",
      perusahaan: "Gojek Indonesia",
    },
    {
      nama: "Angkara Messi",
      jabatan: "Cleaning Service",
      email: "messi@co.id",
      perusahaan: "Shoope Indonesia",
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setShowCreateAcc(true);
  };

  const toggleEditForm = () => {
    const mainbar = document.querySelector("#mainbar");
    if (showPopup) {
      hideBackgroundModal(mainbar);
      setShowPopup(false);
      return;
    }

    showBackgroundModal(mainbar);
    setShowPopup(true);
  };

  const toggleDeleteModal = () => {
    const mainbar = document.querySelector("#mainbar");
    if (deleteModal) {
      hideBackgroundModal(mainbar);
      setDeleteModal(false);
      return;
    }

    showBackgroundModal(mainbar);
    setDeleteModal(true);
  };

  const buttonAction = [
    <>
      <span
        className={`requested ${style.buttonAction}`}
        onClick={toggleEditForm}
      >
        <EditIcon />
      </span>
      <span
        className={`danger ${style.buttonAction}`}
        onClick={toggleDeleteModal}
      >
        <DeleteIcon />
      </span>
    </>,
    <>
      <span
        className={`requested ${style.buttonAction}`}
        onClick={toggleEditForm}
      >
        <EditIcon />
      </span>
      <span
        className={`danger ${style.buttonAction}`}
        onClick={toggleDeleteModal}
      >
        <DeleteIcon />
      </span>
    </>,
  ];

  const formInputsEmployee = [
    {
      label: "Nama",
      type: "text",
      id: "name",
      value: name,
      placeholder: "Masukkan nama administator",
      onChange: (e) => setName(e.target.value),
    },
    {
      label: "Jabatan",
      type: "text",
      id: "position",
      value: position,
      placeholder: "Masukkan jabatan administator",
      onChange: (e) => setPosition(e.target.value),
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      value: email,
      placeholder: "Masukkan email administator",
      onChange: (e) => setEmail(e.target.value),
    },
  ];

  return (
    <div className={`${style.superAdminAdmin} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.formCreate}>
            <h2>Administator</h2>
            <div className={style.container}>
              <h3>Buat Administator Baru</h3>
              <form className={style.form} onSubmit={submitHandler}>
                <div className={style.formGroup}>
                  <label htmlFor="name">Nama</label>
                  <input type="text" id="name" />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="position">Jabatan</label>
                  <input type="text" id="position" />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="company">Perusahaan</label>
                  <select name="company" id="company">
                    <option value="gojek">Gojek</option>
                    <option value="shopee">Shopee</option>
                  </select>
                </div>
                <button type="submit">Buat Akun</button>
              </form>
            </div>
          </div>
          <div
            className={`${style.accountCreated}  ${
              showCreateAcc && style.show
            }`}
          >
            <div className={style.info}>Akun administator berhasil dibuat!</div>
            <span>Email : komparasi@coba.id</span>
            <span>Password : 2hdhs323d@asd8@</span>
          </div>
          <div className={style.listAdministator}>
            <div className={style.title}>
              <h3>Daftar Administator</h3>
              <input type="text" placeholder="Cari nama atau jabatan" />
            </div>
            <Table rows={rows} iconLabel="Aksi" icons={buttonAction} />
          </div>
          {showPopup && (
            <FormUpdate
              title="Ubah Data Administator"
              formInputs={formInputsEmployee}
              backHandle={toggleEditForm}
            />
          )}
          {deleteModal && (
            <RequestAction
              title="Konfirmasi Hapus Data"
              type="delete"
              backHandle={toggleDeleteModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SuperAdminAdmin;
