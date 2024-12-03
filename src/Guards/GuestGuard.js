import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
// routes

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  if (cookies.login) {
    return <Navigate to={"/dashboard"} />;
  }

  return <>{children}</>;
}
