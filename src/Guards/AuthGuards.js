import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Login from "../Login";
// AuthGuards.propTypes = {
//   children: PropTypes.node,
// };

const AuthGuards = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  if (!cookies.login) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <>{children}</>;
};

export default AuthGuards;
