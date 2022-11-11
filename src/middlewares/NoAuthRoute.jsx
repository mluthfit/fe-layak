import { Navigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import TypeRole, { getRole } from "../scripts/role";

const NoAuthRoute = ({ children }) => {
  const role = getRole();

  if ([TypeRole.SUPERADMIN, TypeRole.USER, TypeRole.ADMIN].includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  setLocalStorage("token", "");
  return children;
};

export default NoAuthRoute;
