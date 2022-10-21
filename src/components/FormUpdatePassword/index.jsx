import React from "react";
import style from "./style.module.css";

const FormUpdatePassword = ({ handleBack }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={style.formUpdatePassword}>
      <h2>Ganti Password</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="old_password">Password Lama</label>
          <input type="password" id="old_password" name="old_password" />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="new_password">Password Baru</label>
          <input type="password" id="new_password" name="new_password" />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="confirm_new_password">Konfirmasi Password Baru</label>
          <input
            type="password"
            id="confirm_new_password"
            name="confirm_new_password"
          />
        </div>
        <div className={style.buttons}>
          <button type="submit" className={style.save}>
            Simpan
          </button>
          <button type="button" className={style.back} onClick={handleBack}>
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdatePassword;
