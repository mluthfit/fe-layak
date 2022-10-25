import React from "react";
import style from "./style.module.css";

const FormUpdate = ({ title, formInput, submitHandle, backHandle }) => {
  return (
    <div className={style.formUpdate}>
      <h2>{title}</h2>
      {formInput.map((input) => (
        <div className={style.formGroup}>
          <label htmlFor={input.id}>{input.label}</label>
          <input
            type={input.type}
            id={input.id}
            name={input.id}
            onChange={input.onChangeHandle}
          />
        </div>
      ))}
      {/* <div className={style.formGroup}>
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
      </div> */}
      <div className={style.buttons}>
        <button type="submit" className={style.save} onClick={submitHandle}>
          Simpan
        </button>
        <button type="button" className={style.back} onClick={backHandle}>
          Kembali
        </button>
      </div>
    </div>
  );
};

export default FormUpdate;
