import { Navigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import TypeRole, { getRole } from "../scripts/role";

const SuperAdminRoute = ({ children }) => {
  const role = getRole();

  if ([TypeRole.ADMIN, TypeRole.USER].includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === TypeRole.SUPERADMIN) {
    return children;
  }

  setLocalStorage("token", "");
  return <Navigate to="/auth/login" replace />;
};

export default SuperAdminRoute;
