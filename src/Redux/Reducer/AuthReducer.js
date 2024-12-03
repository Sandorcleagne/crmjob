import { Navigate, useNavigate } from "react-router";
import swal from "sweetalert";
import { apiurl, authCode } from "../../Host";
import { LOGIN, LOGOUT } from "../ActionTypes/ActionType";

const initialState = {
  isLoggedIn: false,
  userData: [],
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        userData: action.payload,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        userData: null,
      });
  }
  return state;
};

export const login = (email, password, setCookie, navigate) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    siteId: 1,
    userEmail: email,
    userPassword: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl + "userLogin?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      if (result.status) {
        swal("Good job!", "Your Login is SuccessFull", "success");
        setCookie("login", JSON.stringify(result));
        navigate("/dashboard");
      } else {
        swal("Alert", "Something Went Wrong", "error");
      }
    })
    .catch((error) => console.log("error", error));
};
