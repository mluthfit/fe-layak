/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [userId, setUserId] = useState("0");

  const [formCreate, setFormCreate] = useState({
    nama: "",
    email: "",
    position: "",
    company_id: 0,
  });

  const [formCreateError, setFormCreateError] = useState({
    nama: "",
    email: "",
    position: "",
    company_id: "",
  });

  const [formUpdate, setFormUpdate] = useState({
    nama: "",
    position: "",
    email: "",
  });

  const [formUpdateError, setFormUpdateError] = useState({
    nama: "",
    position: "",
    email: "",
  });

  const onResetFormCreate = () => {
    setFormCreate({
      nama: "",
      email: "",
      position: "",
      company_id: "",
    });
  };

  const onResetFormCreateError = () => {
    setFormCreateError({
      nama: "",
      email: "",
      position: "",
      company_id: 0,
    });
  };

  const onResetFormUpdateError = () => {
    setFormUpdateError({
      nama: "",
      position: "",
      email: "",
    });
  };

  const onFormError = (error, setState) => {
    error.forEach(({ field, message }) => {
      setState((current) => ({
        ...current,
        [field]: message,
      }));
    });
  };

  const onChangeHandler = (getState, setState, key, value) => {
    return setState({
      ...getState,
      [key]: Number.isInteger(getState[key]) ? parseInt(value) : value,
    });
  };

  const showEditForm = (user) => {
    const mainbar = document.querySelector("#mainbar");
    setUserId(user.id);
    setFormUpdate({
      nama: user.nama,
      position: user.position,
      email: user.email,
      sisa_cuti: parseInt(user.sisa_cuti),
    });
    showBackgroundModal(mainbar);
    setShowPopup(true);
  };

  const hideEditForm = () => {
    const mainbar = document.querySelector("#mainbar");
    hideBackgroundModal(mainbar);
    setShowPopup(false);
  };

  const showDeleteModal = ({ id }) => {
    const mainbar = document.querySelector("#mainbar");
    setUserId(id);
    showBackgroundModal(mainbar);
    setDeleteModal(true);
  };

  const hideDeleteModal = () => {
    const mainbar = document.querySelector("#mainbar");
    hideBackgroundModal(mainbar);
    setDeleteModal(false);
  };

  const inputsUpdate = [
    {
      label: "Nama",
      type: "text",
      id: "nama",
      value: formUpdate.nama,
      placeholder: "Masukkan nama karyawan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "nama", e.target.value),
    },
    {
      label: "Jabatan",
      type: "text",
      id: "position",
      value: formUpdate.position,
      placeholder: "Masukkan jabatan karyawan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "position", e.target.value),
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      value: formUpdate.email,
      placeholder: "Masukkan email karyawan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "email", e.target.value),
    },
  ];

  const header = ["Nama", "Jabatan", "Email", "Nama Perusahaan"];
  const [table, setTable] = useState({
    data: [],
    action: [],
  });

  const fetchData = async () => {
    let action = [];
    try {
      const {
        data: { data: users },
      } = await axios.get("/super-admin/admin");
      const mappedData = users?.map((user) => {
        action.push(
          <>
            <span
              className={`requested ${style.buttonAction}`}
              onClick={() => {
                onResetFormUpdateError();
                showEditForm(user);
              }}
            >
              <EditIcon />
            </span>
            <span
              className={`danger ${style.buttonAction}`}
              onClick={() => showDeleteModal(user)}
            >
              <DeleteIcon />
            </span>
          </>
        );

        return {
          nama: user.nama,
          jabatan: user.position,
          email: user.email,
          perusahaan: user.company.name,
        };
      });

      setTable({
        data: mappedData || [],
        action,
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const [userCreated, setUserCreated] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const {
        data: { data: user },
      } = await axios.post("/super-admin/admin", formCreate);
      setUserCreated({
        email: user.email,
        password: "defaultpassword",
      });

      onResetFormCreate();
      onResetFormCreateError();
      setShowCreateAcc(true);
      setLoading(true);
      fetchData();
    } catch ({ response }) {
      console.log(response);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormCreateError);
      }
    }
  };

  const submitDeleteHandler = async () => {
    hideDeleteModal();

    try {
      await axios.delete(`/super-admin/admin/${userId}`);
      setLoading(true);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/super-admin/admin/${userId}`, formUpdate);
      hideEditForm();
      onResetFormUpdateError();
      setLoading(true);
      fetchData();
    } catch ({ response }) {
      console.log(response);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormUpdateError);
      }
    }
  };

  const [companyList, setCompanyList] = useState([]);
  const fetchCompany = async () => {
    try {
      const {
        data: { data: companies },
      } = await axios.get("/super-admin/companies");

      const mappedData = companies.map(({ id, nama }) => ({ id, nama }));
      setFormCreate({
        ...formCreate,
        company_id: mappedData[0].id || 0,
      });
      setCompanyList(mappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchData();
    document.title = "Administator - Dev Dashboard";
  }, []);

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
                  <input
                    type="text"
                    id="nama"
                    value={formCreate.nama}
                    onChange={(e) =>
                      onChangeHandler(
                        formCreate,
                        setFormCreate,
                        "nama",
                        e.target.value
                      )
                    }
                    required
                  />
                  {formCreateError.nama && (
                    <div className={`${style.error} danger`}>
                      {formCreateError.nama}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={formCreate.email}
                    onChange={(e) =>
                      onChangeHandler(
                        formCreate,
                        setFormCreate,
                        "email",
                        e.target.value
                      )
                    }
                    required
                  />
                  {formCreateError.email && (
                    <div className={`${style.error} danger`}>
                      {formCreateError.email}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="position">Jabatan</label>
                  <input
                    type="text"
                    id="position"
                    value={formCreate.position}
                    onChange={(e) =>
                      onChangeHandler(
                        formCreate,
                        setFormCreate,
                        "position",
                        e.target.value
                      )
                    }
                    required
                  />
                  {formCreateError.position && (
                    <div className={`${style.error} danger`}>
                      {formCreateError.position}
                    </div>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="company">Perusahaan</label>
                  <select
                    name="company"
                    id="company"
                    value={formCreate.company_id}
                    onChange={(e) =>
                      onChangeHandler(
                        formCreate,
                        setFormCreate,
                        "company_id",
                        e.target.value
                      )
                    }
                    required
                  >
                    {companyList.map(({ id, nama }) => (
                      <option value={id}>{nama}</option>
                    ))}
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
            <span>Email : {userCreated.email}</span>
            <span>Password : {userCreated.password}</span>
          </div>
          <div className={style.listAdministator}>
            <div className={style.title}>
              <h3>Daftar Administator</h3>
              <input type="text" placeholder="Cari nama atau jabatan" />
            </div>
            <Table
              label={header}
              rows={table.data}
              icon={{ label: "Aksi", element: table.action }}
            />
          </div>
          {showPopup && (
            <FormUpdate
              title="Ubah Data Administator"
              formInputs={inputsUpdate}
              submitHandle={submitUpdateHandler}
              formError={formUpdateError}
              backHandle={hideEditForm}
            />
          )}
          {deleteModal && (
            <RequestAction
              title="Konfirmasi Hapus Data"
              type="delete"
              submitHandle={submitDeleteHandler}
              backHandle={hideDeleteModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SuperAdminAdmin;
