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

const SuperAdminCompany = () => {
  const [loading, setLoading] = useState(true);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [companyId, setCompanyId] = useState("0");
  const [search, setSearch] = useState("");

  const [formCreate, setFormCreate] = useState({
    nama: "",
    email: "",
    alamat: "",
    web: "",
    no_hp: "",
    jatah_cuti: 0,
  });

  const [formCreateError, setFormCreateError] = useState({
    nama: "",
    email: "",
    alamat: "",
    web: "",
    no_hp: "",
    jatah_cuti: "",
  });

  const [formUpdate, setFormUpdate] = useState({
    nama: "",
    email: "",
    alamat: "",
    web: "",
    no_hp: "",
    jatah_cuti: 0,
  });

  const [formUpdateError, setFormUpdateError] = useState({
    nama: "",
    email: "",
    alamat: "",
    web: "",
    no_hp: "",
    jatah_cuti: "",
  });

  const resetFormCreateError = () => {
    setFormCreateError({
      nama: "",
      email: "",
      alamat: "",
      web: "",
      no_hp: "",
      jatah_cuti: "",
    });
  };

  const resetFormCreate = () => {
    setFormCreate({
      nama: "",
      email: "",
      alamat: "",
      web: "",
      no_hp: "",
      jatah_cuti: 0,
    });
  };

  const resetFormUpdateError = () => {
    setFormUpdateError({
      nama: "",
      email: "",
      alamat: "",
      web: "",
      no_hp: "",
      jatah_cuti: "",
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

  const showEditForm = (company) => {
    const mainbar = document.querySelector("#mainbar");
    setCompanyId(company.id);
    setFormUpdate({
      nama: company.nama,
      email: company.email,
      alamat: company.alamat,
      web: company.web,
      no_hp: company.no_hp,
      jatah_cuti: company.jatah_cuti,
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
    setCompanyId(id);
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
      placeholder: "Masukkan nama perusahaan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "nama", e.target.value),
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      value: formUpdate.email,
      placeholder: "Masukkan email perusahaan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "email", e.target.value),
    },
    {
      label: "Alamat",
      type: "text",
      id: "alamat",
      value: formUpdate.alamat,
      placeholder: "Masukkan alamat perusahaan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "alamat", e.target.value),
    },
    {
      label: "Website",
      type: "text",
      id: "web",
      value: formUpdate.web,
      placeholder: "Masukkan jabatan perusahaan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "web", e.target.value),
    },
    {
      label: "Nomor Telepon",
      type: "text",
      id: "no_hp",
      value: formUpdate.no_hp,
      placeholder: "Masukkan nomor telepon perusahaan",
      onChange: (e) =>
        onChangeHandler(formUpdate, setFormUpdate, "no_hp", e.target.value),
    },
    {
      label: "Cuti Per Tahun",
      type: "text",
      id: "jatah_cuti",
      value: formUpdate.jatah_cuti,
      placeholder: "Masukkan cuti per tahun perusahaan",
      onChange: (e) =>
        setFormUpdate({
          ...formUpdate,
          jatah_cuti: parseInt(e.target.value),
        }),
    },
  ];

  const header = ["Nama", "Email", "No Telepon", "Cuti Per Tahun"];
  const [table, setTable] = useState({
    data: [],
    action: [],
  });

  const fetchData = async (api) => {
    let action = [];
    try {
      const {
        data: { data: companies },
      } = await axios.get(api);
      const mappedData = companies?.map((company) => {
        action.push(
          <>
            <span
              className={`requested ${style.buttonAction}`}
              onClick={() => {
                resetFormUpdateError();
                showEditForm(company);
              }}
            >
              <EditIcon />
            </span>
            <span
              className={`danger ${style.buttonAction}`}
              onClick={() => showDeleteModal(company)}
            >
              <DeleteIcon />
            </span>
          </>
        );

        return {
          nama: company.nama,
          email: company.email,
          no_telepon: company.no_hp,
          cuti_per_tahun: company.jatah_cuti,
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

  const [companyCreated, setCompanyCreated] = useState({
    nama: "",
    email: "",
    alamat: "",
    web: "",
    no_hp: "",
    jatah_cuti: 0,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const {
        data: { data: company },
      } = await axios.post("/super-admin/companies", formCreate);
      setCompanyCreated({
        nama: company.nama,
        email: company.email,
        alamat: company.alamat,
        web: company.web || "-",
        no_hp: company.no_hp,
        jatah_cuti: company.jatah_cuti,
      });

      setShowCreateAlert(true);
      resetFormCreate();
      resetFormCreateError();
      setLoading(true);
      setSearch("");
      fetchData("/super-admin/companies");
    } catch ({ response }) {
      console.log(response);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormCreateError);
      }
    }
  };

  const submitDeleteHandler = async () => {
    hideDeleteModal();
    setShowCreateAlert(false);

    try {
      await axios.delete(`/super-admin/companies/${companyId}`);
      setLoading(true);
      fetchData(`/super-admin/companies?search=${search}`);
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/super-admin/companies/${companyId}`, formUpdate);
      hideEditForm();
      setLoading(true);
      resetFormUpdateError();
      fetchData(`/super-admin/companies?search=${search}`);
    } catch ({ response }) {
      console.log(response);
      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormUpdateError);
      }
    }
  };

  useEffect(() => {
    fetchData("/super-admin/companies");
    document.title = "Perusahaan - Dev Dashboard";
  }, []);

  return (
    <div className={style.superAdminCompany}>
      <div className={style.formCreate}>
        <h2>Perusahaan</h2>
        <div className={style.container}>
          <h3>Buat Data Perushaan Baru</h3>
          <form className={style.form} onSubmit={submitHandler}>
            <div className={style.formContainer}>
              <div className={style.formGroup}>
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  id="name"
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
                {formCreateError.email && (
                  <div className={`${style.error} danger`}>
                    {formCreateError.email}
                  </div>
                )}
              </div>
              <div className={style.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
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
                <label htmlFor="address">Alamat</label>
                <input
                  type="text"
                  id="address"
                  value={formCreate.alamat}
                  onChange={(e) =>
                    onChangeHandler(
                      formCreate,
                      setFormCreate,
                      "alamat",
                      e.target.value
                    )
                  }
                  required
                />
                {formCreateError.alamat && (
                  <div className={`${style.error} danger`}>
                    {formCreateError.alamat}
                  </div>
                )}
              </div>
              <div className={style.formGroup}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  value={formCreate.web}
                  onChange={(e) =>
                    onChangeHandler(
                      formCreate,
                      setFormCreate,
                      "web",
                      e.target.value
                    )
                  }
                />
                {formCreateError.web && (
                  <div className={`${style.error} danger`}>
                    {formCreateError.web}
                  </div>
                )}
              </div>
              <div className={style.formGroup}>
                <label htmlFor="phone_number">Nomor Telepon</label>
                <input
                  type="text"
                  id="phone_number"
                  value={formCreate.no_hp}
                  onChange={(e) =>
                    onChangeHandler(
                      formCreate,
                      setFormCreate,
                      "no_hp",
                      e.target.value
                    )
                  }
                  required
                />
                {formCreateError.no_hp && (
                  <div className={`${style.error} danger`}>
                    {formCreateError.no_hp}
                  </div>
                )}
              </div>
              <div className={style.formGroup}>
                <label htmlFor="maxCuti">Cuti Per Tahun</label>
                <input
                  type="text"
                  id="maxCuti"
                  value={formCreate.jatah_cuti}
                  onChange={(e) =>
                    onChangeHandler(
                      formCreate,
                      setFormCreate,
                      "jatah_cuti",
                      e.target.value
                    )
                  }
                  required
                />
                {formCreateError.jatah_cuti && (
                  <div className={`${style.error} danger`}>
                    {formCreateError.jatah_cuti}
                  </div>
                )}
              </div>
            </div>
            <button type="submit">Buat Akun</button>
          </form>
        </div>
      </div>
      <div
        className={`${style.accountCreated}  ${showCreateAlert && style.show}`}
      >
        <div className={style.info}>Data perusahaan berhasil dibuat!</div>
        <span>Nama : {companyCreated.nama}</span>
        <span>Email : {companyCreated.email}</span>
        <span>Alamat : {companyCreated.alamat}</span>
        <span>Website : {companyCreated.web}</span>
        <span>Nomor Telepon : {companyCreated.no_hp}</span>
        <span>Cuti Per Tahun : {companyCreated.jatah_cuti}</span>
      </div>
      <div className={style.listCompanies}>
        <div className={style.title}>
          <h3>Daftar Perusahaan</h3>
          <input
            type="text"
            placeholder="Cari nama perusahaan"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLoading(true);
              fetchData(`/super-admin/companies?search=${e.target.value}`);
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
          title="Ubah Data Administator"
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

export default SuperAdminCompany;
