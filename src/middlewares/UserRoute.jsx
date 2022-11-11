import { Navigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import TypeRole, { getRole } from "../scripts/role";

const UserRoute = ({ children }) => {
  const role = getRole();

  if ([TypeRole.USER, TypeRole.ADMIN].includes(role)) {
    return children;
  }

  if (role === TypeRole.SUPERADMIN) {
    return <Navigate to="/super-admin" replace />;
  }

  setLocalStorage("token", "");
  return <Navigate to="/auth/login" replace />;
};

export default UserRoute;
