/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/pencil-edit.svg";
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
import { ReactComponent as RequstedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as DeclinedIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as CompanyIcon } from "../../assets/icons/organization.svg";
import { ReactComponent as MapIcon } from "../../assets/icons/map.svg";
import { ReactComponent as TelpIcon } from "../../assets/icons/call-hash.svg";
import { ReactComponent as WebIcon } from "../../assets/icons/globe.svg";
import Spinner from "../../components/Spinner";
import ListOverview from "../../components/ListOverview";
import FormUpdate from "../../components/FormUpdate";
import {
  showBackgroundModal,
  hideBackgroundModal,
} from "../../scripts/backgroundModal";
import { toDateFormat, toTimeFormat } from "../../scripts/string";
import style from "./style.module.css";

const Overview = () => {
  const storageUrl = process.env.REACT_APP_STORAGE_URL;
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const [formUpdateError, setFormUpdateError] = useState({
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [formUpdate, setFormUpdate] = useState({
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [profile, setProfile] = useState({
    name: "",
    position: "",
    email: "",
    joined: "",
    sisaCuti: 0,
    avatar: "",
    clockIn: null,
    clockOut: null,
  });

  const [company, setCompany] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    web: "",
    cutiPerTahun: 0,
  });

  const [absensi, setAbsensi] = useState([]);
  const [cuti, setCuti] = useState([]);
  const [reimburse, setReimburse] = useState([]);

  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);

  const onChangeHandler = (setState, key, value) => {
    setState((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const onResetFormUpdateError = () => {
    setFormUpdateError({
      password: "",
      new_password: "",
      confirm_new_password: "",
    });
  };

  const onResetFormUpdate = () => {
    setFormUpdate({
      password: "",
      new_password: "",
      confirm_new_password: "",
    });
  };

  const openUploadImage = (e) => {
    const fileInput = e.target.parentNode.querySelector("#fileInput");
    fileInput.click();
  };

  const toggleUpdatePassPopup = () => {
    const mainbar = document.querySelector("#mainbar");
    if (showPopup) {
      hideBackgroundModal(mainbar);
      setShowPopup(false);
      return;
    }

    showBackgroundModal(mainbar);
    onResetFormUpdate();
    resetAll();
    setShowPopup(true);
  };

  const formInputsPassword = [
    {
      label: "Password Lama",
      type: "password",
      id: "password",
      value: formUpdate.password,
      placeholder: "Masukkan password lama",
      onChange: (e) =>
        onChangeHandler(setFormUpdate, "password", e.target.value),
    },
    {
      label: "Password Baru",
      type: "password",
      id: "new_password",
      value: formUpdate.new_password,
      placeholder: "Masukkan password baru",
      onChange: (e) =>
        onChangeHandler(setFormUpdate, "new_password", e.target.value),
    },
    {
      label: "Konfirmasi Password Baru",
      type: "password",
      id: "confirm_new_password",
      value: formUpdate.confirm_new_password,
      placeholder: "Masukkan password baru lagi",
      onChange: (e) =>
        onChangeHandler(setFormUpdate, "confirm_new_password", e.target.value),
    },
  ];

  const onFormError = (error, setState) => {
    error.forEach(({ field, message }) => {
      setState((current) => ({
        ...current,
        [field]: message,
      }));
    });
  };

  const resetAll = () => {
    onResetFormUpdateError();
    setSuccess("");
    setErrorUpdate("");
  };

  const submitUpdatePassHandle = async (e) => {
    e.preventDefault();
    resetAll();

    try {
      const { data: response } = await axios.put(
        "/profiles/edit-password",
        formUpdate
      );

      setSuccess(response.messages);

      const mainbar = document.querySelector("#mainbar");
      hideBackgroundModal(mainbar);
      setShowPopup(false);
    } catch ({ response }) {
      if (response.data.messages) {
        setErrorUpdate(response.data.messages);
      }

      if (Array.isArray(response.data)) {
        onFormError(response.data, setFormUpdateError);
      }
    }
  };

  const mapUser = (user) => {
    setProfile((current) => ({
      ...current,
      name: user.nama,
      position: user.position,
      email: user.email,
      avatar: user.foto_profil,
      joined: toDateFormat(user.createdAt),
      sisaCuti: user.sisa_cuti,
    }));

    setCompany({
      name: user.company?.nama || "-",
      address: user.company?.alamat || "-",
      email: user.company?.email || "-",
      phone: user.company?.no_hp || "-",
      web: user.company?.web || "-",
      cutiPerTahun: user.company?.jatah_cuti || 0,
    });
  };

  const mapAbsensi = (presences) => {
    const nowDate = toDateFormat(new Date());
    const mapped = presences.map((presence) => {
      const presenceDate = toDateFormat(presence.createdAt);
      if (nowDate === presenceDate) {
        setProfile((current) => ({
          ...current,
          clockIn: presence.clock_in && toTimeFormat(presence.clock_in),
          clockOut: presence.clock_out && toTimeFormat(presence.clock_out),
        }));
      }

      return {
        link: `/dashboard/absensi/${presence.id}`,
        title: presenceDate,
        icons: (
          <>
            <span className={presence.clock_in ? "success" : "danger"}>
              <ClockInIcon />
            </span>
            <span className={presence.clock_out ? "success" : "danger"}>
              <ClockOutIcon />
            </span>
          </>
        ),
      };
    });

    setAbsensi(mapped);
  };

  const mapCuti = (leaves) => {
    const mapped = leaves.map((cuti) => ({
      link: `/dashboard/cuti/${cuti.id}`,
      title: `${toDateFormat(cuti.start_date)} - ${toDateFormat(
        cuti.end_date
      )}`,
      icons:
        cuti.status === "Pending" ? (
          <span className="requested">
            <RequstedIcon />
          </span>
        ) : cuti.status === "Approved" ? (
          <span className="success">
            <ApprovedIcon />
          </span>
        ) : (
          <span className="danger">
            <DeclinedIcon />
          </span>
        ),
    }));

    setCuti(mapped);
  };

  const mapReimburse = (reimbursements) => {
    const mapped = reimbursements.map((reimburse) => ({
      link: `/dashboard/reimbursement/${reimburse.id}`,
      title: reimburse.kebutuhan,
      icons:
        reimburse.status === "Pending" ? (
          <span className="requested">
            <RequstedIcon />
          </span>
        ) : reimburse.status === "Approved" ? (
          <span className="success">
            <ApprovedIcon />
          </span>
        ) : (
          <span className="danger">
            <DeclinedIcon />
          </span>
        ),
    }));

    setReimburse(mapped);
  };

  const fetchData = async () => {
    try {
      const {
        data: { data: user },
      } = await axios.get("/dashboard");

      console.log(user);
      mapUser(user);
      mapAbsensi(user.presences);
      mapCuti(user.leaves);
      mapReimburse(user.reimbursements);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("foto_profil", file);

      setShowProgressBar(true);
      await axios.put("/profiles/edit-photo", formData, {
        onUploadProgress: ({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        },
      });
      setShowProgressBar(false);

      setLoading(true);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = "Overview - Dashboard";
  }, []);

  return (
    <div className={`${style.overview} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.left}>
            <div className={style.biodata}>
              {showProgressBar && (
                <div className={style.uploadBar}>
                  <div
                    className={style.progress}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
              <div className={style.mainDetails}>
                <div className={style.avatar} onClick={openUploadImage}>
                  <img src={`${storageUrl}/${profile.avatar}`} alt="avatar" />
                  <input
                    type="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    className={style.changePhotoProfile}
                    onChange={(e) => {
                      updateImage(e.target.files[0]);
                    }}
                  />
                  <div className={style.blank}></div>
                </div>
                <span className={style.name}>{profile.name}</span>
                <span className={style.position}>{profile.position}</span>
              </div>
              <div className={style.secondaryDetails}>
                <div>
                  <EmailIcon width={20} />
                  <span>{profile.email}</span>
                </div>
                <div>
                  <DateIcon width={20} />
                  <span>{profile.joined}</span>
                </div>
              </div>
              <button
                className={style.changePassword}
                onClick={toggleUpdatePassPopup}
              >
                <EditIcon />
                <span>Ganti Password</span>
              </button>
              {success && (
                <div className={`${style.flash} success`}>{success}</div>
              )}
            </div>
            {showPopup && (
              <FormUpdate
                title="Ganti Password"
                formInputs={formInputsPassword}
                formError={formUpdateError}
                errorMsg={errorUpdate}
                submitHandle={submitUpdatePassHandle}
                backHandle={toggleUpdatePassPopup}
              />
            )}
            <div className={style.companyProfile}>
              <h2>Perusahaan</h2>
              <div className={style.details}>
                <div>
                  <CompanyIcon />
                  <span>{company.name}</span>
                </div>
                <div>
                  <MapIcon />
                  <span>{company.address}</span>
                </div>
                <div>
                  <EmailIcon />
                  <span>{company.email}</span>
                </div>
                <div>
                  <TelpIcon />
                  <span>{company.phone}</span>
                </div>
                <div>
                  <WebIcon />
                  <span>{company.web}</span>
                </div>
                <div>
                  <CalendarIcon />
                  <span>
                    {company.cutiPerTahun
                      ? `${company.cutiPerTahun} Per Tahun`
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <ListOverview
              title="Absensi"
              blank="Data absensi tidak ditemukan"
              href="/dashboard/absensi"
              Icon={AbsensiIcon}
              listBar={absensi}
              additionalContent={
                <div className={style.statusToday}>
                  <div>
                    <span
                      className={`${style.icon} ${
                        profile.clockIn ? "success" : "danger"
                      }`}
                    >
                      <ClockInIcon />
                    </span>
                    <span
                      className={`${style.time} ${profile.clockIn || "gray"}`}
                    >
                      {profile.clockIn || "Belum melakukan absensi masuk"}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`${style.icon} ${
                        profile.clockOut ? "success" : "danger"
                      }`}
                    >
                      <ClockOutIcon />
                    </span>
                    <span
                      className={`${style.time} ${profile.clockOut || "gray"}`}
                    >
                      {profile.clockOut || "Belum melakukan absensi pulang"}
                    </span>
                  </div>
                </div>
              }
            />
            <ListOverview
              title="Pengajuan Cuti"
              blank="Data pengajuan cuti tidak ditemukan"
              href="/dashboard/cuti"
              Icon={CalendarIcon}
              listBar={cuti}
              additionalContent={
                <div className={style.sisaCuti}>
                  <span className={style.label}>Sisa Cuti</span>
                  <span className={style.value}>{profile.sisaCuti} Hari</span>
                </div>
              }
            />
            <ListOverview
              title="Reimbursement"
              blank="Data pengajuan reimbursement tidak ditemukan"
              href="/dashboard/reimbursement"
              Icon={CalculatorIcon}
              listBar={reimburse}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
