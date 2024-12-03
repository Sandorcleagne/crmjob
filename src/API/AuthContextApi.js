import React, { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Redux/ActionTypes/ActionType";
import swal from "sweetalert";
import {apiurl, authCode} from "../Host";
export const AuthContext = createContext({
  login: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const login = (email, password) => {
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

    fetch(apiurl+"/userLogin?authCode="+authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          swal("Good job!","Your Login is SuccessFull", "success");
          navigate("/dashboard");
          dispatch({
            type: LOGIN,
            payload: result,
          });
        }else{
          swal("Alert","Something Went Wrong", "error");
        }
      })
      .catch((error) => console.log("error"));
  };

  return (
    <AuthContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
