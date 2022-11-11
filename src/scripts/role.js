import CryptoJS from "crypto-js";
import { getLocalStorage, setLocalStorage } from "./localStorage";

const role = {
  USER: "User",
  ADMIN: "Admin",
  SUPERADMIN: "Super Admin",
};

export const saveRole = (role) => {
  const chiperText = CryptoJS.AES.encrypt(
    role,
    process.env.REACT_APP_SECRET_KEY
  ).toString();

  setLocalStorage("role", chiperText);
};

export const getRole = () => {
  const role = getLocalStorage("role", "");
  return CryptoJS.AES.decrypt(role, process.env.REACT_APP_SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
};

export default role;
