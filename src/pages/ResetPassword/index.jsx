import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

const ResetPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/auth/login');
    };
    
    return (
      <div className={style.mainForm}>
      <h2>RESET PASSWORD</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Masukkan Email Anda"
            autocomplete="off"
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="new-password">Password Baru</label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            placeholder="Masukkan Password Baru Anda"
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="confirm-new-password">Konfirmasi Password Baru</label>
          <input
            type="password"
            name="confirm-new-password"
            id="confirm-new-password"
            placeholder="Masukkan Password Baru Anda Sekali Lagi"
          />
        </div>
        <div className={style.buttons}>
          <button type="submit" className={style.submitButton}>
            Ganti Password
          </button>
          <button type="button" onClick={navigateToLogin} className={style.submitButton}>
            Kembali
          </button>
        </div>
      </form>
    </div>
    )
};

export default ResetPassword;