import React from "react";
import Dashboard from "./layouts/dashboard";
import { Routes, Route } from "react-router-dom";
import Overview from "./pages/overview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
      </Route>
    </Routes>
  );
};

export default App;
