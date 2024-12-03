import React from "react";
import swal from "sweetalert";
import { apiurl, authCode } from "../Host";

export const Users_API = (userObj) => {
  console.log("insideAPI", userObj);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: userObj.id,
    managerId: userObj.managerId,
    roleId: userObj.roleId,
    siteId: userObj.siteId,
    status: userObj.status,
    userContact: userObj.userContact,
    userName: userObj.userName,
    userPassword: userObj.userPassword,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl+"/updateUserDetails?authCode="+authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
        if(result.id != null){
            swal("Good job!","Just Updated "+result.userName, "success");
        }else{
            swal("Alert!", "Something Went Erong", "error");
        }
    })
    .catch((error) => console.log("error", error));
};

export default Users_API;
