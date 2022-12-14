import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../scripts/localStorage";
import { saveRole } from "../../scripts/role";
import style from "./style.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onResetInput = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: res } = await axios.post("/auth/login", {
        email,
        password,
      });

      setLocalStorage("token", res.token);
      saveRole(res.data.role);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;

      onResetInput();
      navigate("/dashboard");
    } catch ({ response }) {
      console.log(response);
      setError(response.data.message);
    }
  };

  useEffect(() => {
    document.title = "LayaK - Login";
  }, []);

  return (
    <div className={style.mainForm}>
      <h2>SELAMAT DATANG</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email Anda"
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Masukkan Password Anda"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className={`${style.alert} danger`}>{error}</div>}
        {/* <p>
          <Link to="/auth/forgot-password">Lupa Password?</Link>
        </p> */}
        <div className={style.buttons}>
          <button type="submit" className={style.loginButton}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
