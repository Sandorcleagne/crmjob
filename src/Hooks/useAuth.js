import { useContext } from "react";
import { AuthContext } from "../API/AuthContextApi";

const useAuth = () => useContext(AuthContext);

export default useAuth