import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Login from "./layouts/Login";
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
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
