import React from "react";
import style from "./style.module.css";

const FormLogin = (handleBack) =>{
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <div className={style.mainForm}>
            <h2>SELAMAT DATANG</h2>
            <form onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder="Masukkan Email Anda"
                    autocomplete="off" />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    placeholder="Masukkan Password Anda" />
                </div>
                <p><a href="/forgot-password">Lupa Password?</a></p>
                <div className={style.buttons}>
                    <button type="submit" className={style.loginButton}>Login</button>
                </div>
            </form>
        </div>
    )
};

export default FormLogin;