/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Logout from "./pages/Logout";
import UserRoute from "./middlewares/UserRoute";
import { saveRole } from "./scripts/role";
import AdminRoute from "./middlewares/AdminRoute";
import SuperAdminRoute from "./middlewares/SuperAdminRoute";
import NoAuthRoute from "./middlewares/NoAuthRoute";

const App = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await axios.get(
          "/leaves/download-template-surat-cuti"
        );

        saveRole(res.data.role);
      } catch (error) {
        saveRole("");
        console.log(error);
      }
    })();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Navigate replace to="/auth/login" />} />
      <Route
        path="/dashboard"
        element={
          <UserRoute>
            <Dashboard type="user" />
          </UserRoute>
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
          <AdminRoute>
            <Dashboard type="admin" />
          </AdminRoute>
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
          <SuperAdminRoute>
            <Dashboard type="admin" />
          </SuperAdminRoute>
        }
      >
        <Route index element={<Navigate replace to="perusahaan" />} />
        <Route path="perusahaan" element={<SuperAdminCompany />} />
        <Route path="administator" element={<SuperAdminAdmin />} />
      </Route>
      <Route
        path="/auth"
        element={
          <NoAuthRoute>
            <Auth />
          </NoAuthRoute>
        }
      >
        <Route index element={<Navigate replace to="login" />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />}></Route>
        <Route path="reset-password" element={<ResetPassword />}></Route> */}
      </Route>
      <Route path="/auth/logout" element={<Logout />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
