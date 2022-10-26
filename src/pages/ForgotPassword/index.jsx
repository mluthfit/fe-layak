import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

const ForgotPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/auth/login');
    };

    return (
      <div className={style.mainForm}>
      <h2>LUPA PASSWORD</h2>
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
        <div className={style.buttons}>
          <button type="submit" className={style.submitButton}>
            Kirim Email
          </button>
          <button type="button" onClick={navigateToLogin} className={style.submitButton}>
            Kembali
          </button>
        </div>
      </form>
    </div>
    )
};

export default ForgotPassword;