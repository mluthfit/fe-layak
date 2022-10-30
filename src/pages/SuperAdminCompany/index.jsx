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

const SuperAdminCompany = () => {
  const [loading, setLoading] = useState(true);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxCuti, setMaxCuti] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    document.title = "Perusahaan - Dev Dashboard";
  }, []);

  const rows = [
    {
      nama: "Gojek Indonesia",
      email: "gojek@co.id",
      no_telepon: "022-12345678",
      cuti_per_tahun: 10,
    },
    {
      nama: "Shoope Indonesia",
      email: "shoope@co.id",
      no_telepon: "022-12345678",
      cuti_per_tahun: 15,
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setShowCreateAlert(true);
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
      placeholder: "Masukkan nama perusahaan",
      onChange: (e) => setName(e.target.value),
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      value: email,
      placeholder: "Masukkan email perusahaan",
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Alamat",
      type: "text",
      id: "address",
      value: address,
      placeholder: "Masukkan alamat perusahaan",
      onChange: (e) => setAddress(e.target.value),
    },
    {
      label: "Website",
      type: "text",
      id: "website",
      value: website,
      placeholder: "Masukkan jabatan perusahaan",
      onChange: (e) => setWebsite(e.target.value),
    },
    {
      label: "Nomor Telepon",
      type: "text",
      id: "phone",
      value: phoneNumber,
      placeholder: "Masukkan nomor telepon perusahaan",
      onChange: (e) => setPhoneNumber(e.target.value),
    },
    {
      label: "Cuti Per Tahun",
      type: "text",
      id: "max_cuti",
      value: maxCuti,
      placeholder: "Masukkan cuti per tahun perusahaan",
      onChange: (e) => setMaxCuti(e.target.value),
    },
  ];

  return (
    <div className={`${style.superAdminCompany} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="admin" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.formCreate}>
            <h2>Perusahaan</h2>
            <div className={style.container}>
              <h3>Buat Data Perushaan Baru</h3>
              <form className={style.form} onSubmit={submitHandler}>
                <div className={style.formGroup}>
                  <div className={style.group}>
                    <label htmlFor="name">Nama</label>
                    <input type="text" id="name" />
                  </div>
                  <div className={style.group}>
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" />
                  </div>
                </div>
                <div className={style.formGroup}>
                  <div className={style.group}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                  </div>
                  <div className={style.group}>
                    <label htmlFor="phone_number">Nomor Telepon</label>
                    <input type="text" id="phone_number" />
                  </div>
                </div>
                <div className={style.formGroup}>
                  <div className={style.group}>
                    <label htmlFor="address">Alamat</label>
                    <input type="text" id="address" />
                  </div>
                  <div className={style.group}>
                    <label htmlFor="maxCuti">Cuti Per Tahun</label>
                    <input type="text" id="maxCuti" />
                  </div>
                </div>
                <button type="submit">Buat Akun</button>
              </form>
            </div>
          </div>
          <div
            className={`${style.accountCreated}  ${
              showCreateAlert && style.show
            }`}
          >
            <div className={style.info}>Data perusahaan berhasil dibuat!</div>
            <span>Nama : Komparasi Coba ID</span>
            <span>Email : komparasi@coba.id</span>
            <span>Alamat : Jl. Coba Coba No. 1</span>
            <span>Website : komparasi.coba.id</span>
            <span>Nomor Telepon : 022-12345678</span>
            <span>Cuti Per Tahun : 15</span>
          </div>
          <div className={style.listCompanies}>
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

export default SuperAdminCompany;
