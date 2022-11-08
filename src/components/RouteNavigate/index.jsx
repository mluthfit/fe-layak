import React from "react";
import { Navigate } from "react-router-dom";
import TypeRole from "../../scripts/role";

const RouteNavigate = ({ user }) => {
  return [TypeRole.USER, TypeRole.ADMIN].includes(user.role) ? (
    <Navigate to="/dashboard"></Navigate>
  ) : (
    <Navigate to="/super-admin"></Navigate>
  );
};

export default RouteNavigate;
