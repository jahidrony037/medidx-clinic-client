import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";

const useAuth = () => {
  const allValue = useContext(AuthContext);
  return allValue;
};

export default useAuth;
