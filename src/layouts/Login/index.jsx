import React from "react";
import { Outlet } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
import SideLogo from "../../components/SideLogo";
import style from "./style.module.css";

const Login = () => {
    return (
        <div className={style.Login}>
            <div className={style.formLogin}>
                <FormLogin />
            </div>
            <div className={style.SideLogo}>
                <SideLogo />
            </div>
            
        </div>
    )
};

export default Login;