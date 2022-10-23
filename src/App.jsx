import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Login from "./layouts/Login";
import Overview from "./pages/Overview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
