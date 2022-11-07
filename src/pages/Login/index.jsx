import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";

const Login = (props) => {
  const { setLogged } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api_url = "https://localhost:8080/api";

  const clearInput = () => {
    setEmail("");
    setPassword("");
  ;}

  const login = async () => {
    try {
      const authenticate = {
        email,
        password,
      };

      const { data } = await axios.post(
        `${api_url}/auth/login`,
        authenticate
      );

      localStorage.setItem("token", data.access_token);
      setLogged(true);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    clearInput();
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
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email Anda"
            autoComplete="off"
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Masukkan Password Anda"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>
          <Link to ='/auth/forgot-password'>Lupa Password?</Link>
        </p>
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
