import React from "react";
import { ReactComponent as UploadIcon } from "../../assets/icons/cloud-upload.svg";
import style from "./style.module.css";

const RequestAction = ({
  type,
  title,
  submitHandle,
  backHandle,
  state,
  withInputFile,
}) => {
  const fileInputClick = () => {
    const fileInput = document.getElementById("fileInput");

    fileInput.click();
  };

  return (
    <div className={style.requestAction}>
      <h2>{title}</h2>
      <form onSubmit={submitHandle}>
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
              className={`${style.uploadFile} ${
                !state.get ? "requested" : style.uploaded
              }`}
              onClick={fileInputClick}
            >
              <UploadIcon />
              <span>{!state.get ? "Upload" : state.get.name}</span>
            </div>
            <input
              type="file"
              name="fileInput"
              id="fileInput"
              onChange={(e) => state.set(e.target.files[0])}
              style={{ display: "none" }}
              required
            />
          </>
        )}
        {type === "decline" && (
          <textarea
            name="reasonDeclined"
            id="reasonDeclined"
            placeholder="Masukkan alasan menolak permintaan"
            value={state.get}
            onChange={(e) => state.set(e.target.value)}
            required
          ></textarea>
        )}
        <div className={style.button}>
          <button
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
      </form>
    </div>
  );
};

export default RequestAction;
