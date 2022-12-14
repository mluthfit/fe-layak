import axios from "axios";
import { Navigate } from "react-router-dom";
import { setLocalStorage } from "../../scripts/localStorage";
import { saveRole } from "../../scripts/role";

const Logout = () => {
  (async () => {
    try {
      // await axios.post("/auth/logout");
      setLocalStorage("token", "");
      saveRole("");
      axios.defaults.headers.common["Authorization"] = "";
    } catch (error) {
      console.log(error);
    }
  })();

  return <Navigate to="/auth/login" />;
};

export default Logout;
