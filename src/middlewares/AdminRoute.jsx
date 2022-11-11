import { Navigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import TypeRole, { getRole } from "../scripts/role";

const AdminRoute = ({ children }) => {
  const role = getRole();

  if ([TypeRole.SUPERADMIN, TypeRole.USER].includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === TypeRole.ADMIN) {
    return children;
  }

  setLocalStorage("token", "");
  return <Navigate to="/auth/login" replace />;
};

export default AdminRoute;
