import axios from "axios";
import { Navigate } from "react-router-dom";
import { setLocalStorage } from "../../scripts/localStorage";

const Logout = ({ setUser }) => {
  (async () => {
    try {
      await axios.post("/auth/logout");
      setLocalStorage("token", "");
      axios.defaults.headers.common["Authorization"] = "";
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  })();

  return <Navigate to="/auth/login" />;
};

export default Logout;
