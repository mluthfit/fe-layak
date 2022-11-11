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

const AdminEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [showCreateAcc, setShowCreateAcc] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userId, setUserId] = useState("0");
  const [search, setSearch] = useState("");

  const [formCreate, setFormCreate] = useState({
    nama: "",
    email: "",
    position: "",
  });

  const [formUpdate, setFormUpdate] = useState({
    nama: "",
    position: "",
    email: "",
    sisa_cuti: 0,
  });

  const [formCreateError, setFormCreateError] = useState({
    nama: "",
    email: "",
    position: "",
  });

  const [formUpdateError, setFormUpdateError] = useState({
    nama: "",
    email: "",
    position: "",
    sisa_cuti: "",
  });

  const resetFormCreate = () => {
    setFormCreate({
      nama: "",
      email: "",
      position: "",
    });
  };

  const resetFormCreateError = () => {
    setFormCreateError({
      nama: "",
      email: "",
      position: "",
    });
  };

  const resetFormUpdateError = () => {
    setFormUpdateError({
      nama: "",
      email: "",
      position: "",
      sisa_cuti: "",
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
    {
      label: "Sisa Cuti",
      type: "number",
      id: "sisa_cuti",
      value: formUpdate.sisa_cuti,
      placeholder: "Masukkan sisa cuti karyawan",
      onChange: (e) =>
        setFormUpdate({
          ...formUpdate,
          sisa_cuti: parseInt(e.target.value),
        }),
    },
  ];

  const header = ["Nama", "Jabatan", "Email", "Sisa Cuti"];
  const [table, setTable] = useState({
    data: [],
    action: [],
  });

  const fetchData = async (api) => {
    let action = [];
    try {
      const {
        data: { data: users },
      } = await axios.get(api);
      const mappedData = users?.map((user) => {
        action.push(
          <>
            <span
              className={`requested ${style.buttonAction}`}
              onClick={() => {
                resetFormUpdateError();
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
          sisa_cuti: user.sisa_cuti,
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

  const onFormError = (error, setState) => {
    error.forEach(({ field, message }) => {
      setState((current) => ({
        ...current,
        [field]: message,
      }));
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    resetFormCreateError();

    try {
      const {
        data: { data: user },
      } = await axios.post("/admin/users", formCreate);
      setUserCreated({
        email: user.email,
        password: "defaultpassword",
      });

      resetFormCreate();
      setShowCreateAcc(true);
      setLoading(true);
      setSearch("");
      fetchData("/admin/users");
    } catch ({ response }) {
      console.log(response);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormCreateError);
      }
    }
  };

  const submitDeleteHandler = async () => {
    hideDeleteModal();
    setShowCreateAcc(false);

    try {
      await axios.delete(`/admin/users/${userId}`);
      setLoading(true);
      fetchData(`/admin/users?search=${search}`);
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/admin/users/${userId}`, formUpdate);
      hideEditForm();
      resetFormUpdateError();
      setLoading(true);
      fetchData(`/admin/users?search=${search}`);
    } catch ({ response }) {
      console.log(response);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormUpdateError);
      }
    }

    console.log(formUpdateError);
  };

  useEffect(() => {
    fetchData("/admin/users");
    document.title = "Akun Karyawan - Admin Dashboard";
  }, []);

  return (
    <div className={style.adminEmployees}>
      <div className={style.formCreate}>
        <h2>Akun Karyawan</h2>
        <div className={style.container}>
          <h3>Buat Pengguna Baru</h3>
          <form className={style.form} onSubmit={submitHandler}>
            <div className={style.formGroup}>
              <label htmlFor="name">Nama</label>
              <input
                type="text"
                id="name"
                placeholder="Masukkan nama baru"
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
                placeholder="Masukkan email baru"
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
                placeholder="Masukkan jabatan baru"
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
            <button type="submit">Buat Akun</button>
          </form>
        </div>
      </div>
      <div
        className={`${style.accountCreated}  ${showCreateAcc && style.show}`}
      >
        <div className={style.info}>Akun karyawan berhasil dibuat!</div>
        <span>Email : {userCreated.email}</span>
        <span>Password : {userCreated.password}</span>
      </div>
      <div className={style.listEmployees}>
        <div className={style.title}>
          <h3>Daftar Karyawan</h3>
          <input
            type="text"
            placeholder="Cari nama atau jabatan"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLoading(true);
              fetchData(`/admin/users?search=${e.target.value}`);
            }}
          />
        </div>
        <div className={`${style.tableContainer} ${loading ? "center" : ""}`}>
          {loading ? (
            <Spinner type="admin" size={48} borderSize={5} />
          ) : (
            <Table
              label={header}
              rows={table.data}
              icon={{ label: "Aksi", element: table.action }}
            />
          )}
        </div>
      </div>
      {showPopup && (
        <FormUpdate
          title="Ubah Data Karyawan"
          formInputs={inputsUpdate}
          formError={formUpdateError}
          submitHandle={submitUpdateHandler}
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
    </div>
  );
};

export default AdminEmployees;
