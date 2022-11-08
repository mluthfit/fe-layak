import React from "react";
import { Navigate } from "react-router-dom";
import TypeRole from "../../scripts/role";

const RouteNavigate = ({ role }) => {
  return [TypeRole.USER, TypeRole.ADMIN].includes(role) ? (
    <Navigate to="/dashboard"></Navigate>
  ) : (
    <Navigate to="/super-admin"></Navigate>
  );
};

export default RouteNavigate;
