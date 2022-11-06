import React from "react";
import style from "./style.module.css";

const FormUpdate = ({
  title,
  formInputs,
  formError,
  submitHandle,
  backHandle,
}) => {
  return (
    <div className={style.formUpdate}>
      <h2>{title}</h2>
      <form onSubmit={submitHandle}>
        {formInputs.map((formInput, index) => (
          <div className={style.formGroup} key={index}>
            <label htmlFor={formInput.id}>{formInput.label}</label>
            <input
              type={formInput.type}
              id={formInput.id}
              value={formInput.value}
              placeholder={formInput.placeholder}
              onChange={formInput.onChange}
            />
            {formError && formError[formInput.id] && (
              <div className={`${style.error} danger`}>
                {formError[formInput.id]}
              </div>
            )}
          </div>
        ))}
        <div className={style.buttons}>
          <button type="submit" className={style.save}>
            Simpan
          </button>
          <button type="button" className={style.back} onClick={backHandle}>
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdate;
