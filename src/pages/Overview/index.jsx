import React, { useEffect, useState } from "react";
import { ReactComponent as AbsensiIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as ClockInIcon } from "../../assets/icons/arrow-up-right.svg";
import { ReactComponent as ClockOutIcon } from "../../assets/icons/arrow-down-left.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/pencil-edit.svg";
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar-dates.svg";
import { ReactComponent as RequestedIcon } from "../../assets/icons/check-mark.svg";
import { ReactComponent as ApprovedIcon } from "../../assets/icons/check-marks.svg";
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
import style from "./style.module.css";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

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
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPopup(true);
  };

  const submitUpdatePassHandle = (e) => {
    e.preventDefault();
    console.log("old password :", oldPassword);
    console.log("new password :", newPassword);
    console.log("confirm new password :", confirmPassword);
  };

  const formInputsPassword = [
    {
      label: "Password Lama",
      type: "password",
      id: "old_password",
      value: oldPassword,
      placeholder: "Masukkan password lama",
      onChange: (e) => setOldPassword(e.target.value),
    },
    {
      label: "Password Baru",
      type: "password",
      id: "new_password",
      value: newPassword,
      placeholder: "Masukkan password baru",
      onChange: (e) => setNewPassword(e.target.value),
    },
    {
      label: "Konfirmasi Password Baru",
      type: "password",
      id: "confirm_password",
      value: confirmPassword,
      placeholder: "Masukkan password baru lagi",
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  const listBarAbsensi = [
    {
      link: "/dashboard/absensi/1",
      title: "06 Januari 2021",
      icons: (
        <>
          <span className="success">
            <ClockInIcon />
          </span>
          <span className="danger">
            <ClockOutIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/absensi/2",
      title: "05 Januari 2021",
      icons: (
        <>
          <span className="success">
            <ClockInIcon />
          </span>
          <span className="danger">
            <ClockOutIcon />
          </span>
        </>
      ),
    },
  ];

  const listBarCuti = [
    {
      link: "/dashboard/cuti/1",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className="requested">
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
          <span className="success">
            <ApprovedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/cuti/3",
      title: "06 Januari 2021 - 08 Januari 2021",
      icons: (
        <>
          <span className="danger">
            <DeclinedIcon />
          </span>
        </>
      ),
    },
  ];

  const listBarReimbursement = [
    {
      link: "/dashboard/reimbursement/1",
      title: "Makan Siang",
      icons: (
        <>
          <span className="requested">
            <RequestedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/reimbursement/2",
      title: "Operasional Perusahaan",
      icons: (
        <>
          <span className="success">
            <ApprovedIcon />
          </span>
        </>
      ),
    },
    {
      link: "/dashboard/reimbursement/3",
      title: "Transportasi",
      icons: (
        <>
          <span className="danger">
            <DeclinedIcon />
          </span>
        </>
      ),
    },
  ];

  return (
    <div className={`${style.overview} ${loading ? "center" : ""}`}>
      {loading ? (
        <Spinner type="user" size={48} borderSize={5} />
      ) : (
        <>
          <div className={style.left}>
            <div className={style.biodata}>
              <div className={style.mainDetails}>
                <div className={style.avatar} onClick={openUploadImage}>
                  <img
                    src="https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"
                    alt=""
                  />
                  <input
                    type="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    className={style.changePhotoProfile}
                  />
                  <div className={style.blank}></div>
                </div>
                <span className={style.name}>John Doe</span>
                <span className={style.position}>IT Support</span>
              </div>
              <div className={style.secondaryDetails}>
                <div>
                  <EmailIcon width={20} />
                  <span>johndoe64@gmail.com</span>
                </div>
                <div>
                  <DateIcon width={20} />
                  <span>16 Juni 2021</span>
                </div>
              </div>
              <button
                className={style.changePassword}
                onClick={toggleUpdatePassPopup}
              >
                <EditIcon />
                <span>Ganti Password</span>
              </button>
            </div>
            {showPopup && (
              <FormUpdate
                title="Ganti Password"
                formInputs={formInputsPassword}
                submitHandle={submitUpdatePassHandle}
                backHandle={toggleUpdatePassPopup}
              />
            )}
            <div className={style.companyProfile}>
              <h2>Perusahaan</h2>
              <div className={style.details}>
                <div>
                  <CompanyIcon />
                  <span>Gojek Indonesia</span>
                </div>
                <div>
                  <MapIcon />
                  <span>Jl. Sudirman No. 395</span>
                </div>
                <div>
                  <EmailIcon />
                  <span>cs@gojek.com</span>
                </div>
                <div>
                  <TelpIcon />
                  <span>+222 923 182</span>
                </div>
                <div>
                  <WebIcon />
                  <span>www.gojek.com</span>
                </div>
                <div>
                  <CalendarIcon />
                  <span>5 per tahun</span>
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
              listBar={listBarAbsensi}
              additionalContent={
                <div className={style.statusToday}>
                  <div>
                    <span className={`${style.icon} success`}>
                      <ClockInIcon />
                    </span>
                    <span className={style.time}>08:00</span>
                  </div>
                  <div>
                    <span className={`${style.icon} danger`}>
                      <ClockOutIcon />
                    </span>
                    <span className={`${style.time} gray`}>
                      Belum melakukan absensi pulang
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
              listBar={listBarCuti}
              additionalContent={
                <div className={style.sisaCuti}>
                  <span className={style.label}>Sisa Cuti</span>
                  <span className={style.value}>10 Hari</span>
                </div>
              }
            />
            <ListOverview
              title="Reimbursement"
              blank="Data pengajuan reimbursement tidak ditemukan"
              href="/dashboard/reimbursement"
              Icon={CalculatorIcon}
              listBar={listBarReimbursement}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
