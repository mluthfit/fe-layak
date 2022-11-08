/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./layouts/Dashboard";
import Auth from "./layouts/Auth";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DetailUserCuti from "./pages/DetailUserCuti";
import DetailUserReimburse from "./pages/DetailUserReimburse";
import Overview from "./pages/Overview";
import UserCuti from "./pages/UserCuti";
import UserReimburse from "./pages/UserReimburse";
import AdminAbsensi from "./pages/AdminAbsensi";
import DetailAdminAbsensi from "./pages/DetailAdminAbsensi";
import AdminCuti from "./pages/AdminCuti";
import DetailAdminCuti from "./pages/DetailAdminCuti";
import AdminReimburse from "./pages/AdminReimburse";
import DetailAdminReimburse from "./pages/DetailAdminReimburse";
import AdminEmployees from "./pages/AdminEmployees";
import SuperAdminAdmin from "./pages/SuperAdminAdmin";
import SuperAdminCompany from "./pages/SuperAdminCompany";
import DetailUserAbsensi from "./pages/DetailUserAbsensi";
import UserAbsensi from "./pages/UserAbsensi";
import RouteNavigate from "./components/RouteNavigate";
import TypeRole from "./scripts/role";
import Logout from "./pages/Logout";
import { useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const { data: response } = await axios.get(
        "/leaves/download-template-surat-cuti"
      );

      setUser({
        ...user,
        role: response.data.role,
      });
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  });

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Navigate replace to="/auth/login" />} />
      <Route
        path="/dashboard"
        element={
          [TypeRole.ADMIN, TypeRole.USER].includes(user?.role) ? (
            <Dashboard type="user" role={user.role} />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      >
        <Route index element={<Overview />} />
        <Route path="absensi" element={<UserAbsensi />} />
        <Route path="absensi/:absensiId" element={<DetailUserAbsensi />} />
        <Route path="cuti" element={<UserCuti />} />
        <Route path="cuti/:cutiId" element={<DetailUserCuti />} />
        <Route path="reimbursement" element={<UserReimburse />} />
        <Route
          path="reimbursement/:reimburseId"
          element={<DetailUserReimburse />}
        />
      </Route>
      <Route
        path="/admin"
        element={
          user?.role === TypeRole.ADMIN ? (
            <Dashboard type="admin" role={user.role} />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      >
        <Route index element={<Navigate replace to="absensi" />} />
        <Route path="absensi" element={<AdminAbsensi />} />
        <Route path="absensi/:absensiId" element={<DetailAdminAbsensi />} />
        <Route path="cuti" element={<AdminCuti />} />
        <Route path="cuti/:cutiId" element={<DetailAdminCuti />} />
        <Route path="reimbursement" element={<AdminReimburse />} />
        <Route
          path="reimbursement/:reimbursementId"
          element={<DetailAdminReimburse />}
        />
        <Route path="employees" element={<AdminEmployees />} />
      </Route>
      <Route
        path="/super-admin"
        element={
          user?.role === TypeRole.SUPERADMIN ? (
            <Dashboard type="admin" role={user.role} />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      >
        <Route index element={<Navigate replace to="perusahaan" />} />
        <Route path="perusahaan" element={<SuperAdminCompany />} />
        <Route path="administator" element={<SuperAdminAdmin />} />
      </Route>
      <Route
        path="/auth"
        element={user ? <RouteNavigate user={user} /> : <Auth />}
      >
        <Route index element={<Navigate replace to="login" />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
        <Route path="reset-password" element={<ResetPassword />}></Route>
      </Route>
      <Route
        path="/auth/logout"
        element={
          user ? <Logout setUser={setUser} /> : <Navigate to="/auth/login" />
        }
      />
    </Routes>
  );
};

export default App;
