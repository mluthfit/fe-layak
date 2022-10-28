import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Auth from "./layouts/Auth";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DetailUserCuti from "./pages/DetailUserCuti";
import DetailUserReimburse from "./pages/DetailUserReimburse";
import Overview from "./pages/Overview";
import UserCuti from "./pages/UserCuti";
import UserReimburse from "./pages/UserReimburse";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
      <Route path="/dashboard" element={<Dashboard type="user" role="admin" />}>
        <Route index element={<Overview />} />
        <Route path="cuti" element={<UserCuti />} />
        <Route path="cuti/:cutiId" element={<DetailUserCuti />} />
        <Route path="reimbursement" element={<UserReimburse />} />
        <Route
          path="reimbursement/:reimburseId"
          element={<DetailUserReimburse />}
        />
      </Route>
      <Route path="/admin" element={<Dashboard type="admin" role="admin" />}>
        <Route index element={<Navigate replace to="absensi" />} />
        <Route path="absensi" element={<></>} />
      </Route>
      <Route
        path="/super-admin"
        element={<Dashboard type="admin" role="super_admin" />}
      >
        <Route index element={<Navigate replace to="perusahaan" />} />
        <Route path="perusahaan" element={<></>} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Navigate replace to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
        <Route path="reset-password" element={<ResetPassword />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
