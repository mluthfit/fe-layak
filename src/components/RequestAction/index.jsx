import React from "react";
import { ReactComponent as UploadIcon } from "../../assets/icons/cloud-upload.svg";
import style from "./style.module.css";

const RequestAction = ({
  type,
  submitHandle,
  backHandle,
  stateValue,
  withInputFile,
}) => {
  const fileInputClick = () => {
    const fileInput = document.getElementById("fileInput");

    fileInput.click();
  };

  return (
    <div className={style.requestAction}>
      <h2>
        {type === "approve"
          ? "Konfirmasi Permintaan"
          : type === "delete"
          ? "Konfirmasi Hapus Data"
          : "Alasan Menolak Permintaan"}
      </h2>
      {type === "approve" && !withInputFile && (
        <div className={style.alert}>
          <span>Apakah anda yakin menyetujui permintaan ini?</span>
          <span>Pastikan anda sudah cek data dengan benar</span>
        </div>
      )}
      {type === "delete" && (
        <div className={style.alert}>
          <span>Apakah anda yakin menghapus data ini?</span>
          <span>Pastikan anda sudah cek data dengan benar</span>
        </div>
      )}
      {type === "approve" && withInputFile && (
        <>
          <div
            className={`${style.uploadFile} requested`}
            onClick={fileInputClick}
          >
            <UploadIcon />
            <span>Upload</span>
          </div>
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            style={{ display: "none" }}
          />
        </>
      )}
      {type === "decline" && (
        <textarea
          name="reasonDeclined"
          id="reasonDeclined"
          placeholder="Masukkan alasan menolak permintaan"
          value={stateValue}
        ></textarea>
      )}
      <div className={style.button}>
        <button
          onClick={submitHandle}
          type="submit"
          className={`${style.submit} ${
            type === "approve" ? "success" : "danger"
          }`}
        >
          {type === "approve"
            ? "Terima"
            : type === "delete"
            ? "Hapus"
            : "Tolak"}
        </button>
        <button
          type="button"
          className={`${style.back} requested`}
          onClick={backHandle}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default RequestAction;
