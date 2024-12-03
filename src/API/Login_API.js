import React from "react";
import { apiurl, authCode } from "../Host";
import swal from "sweetalert";

// export const Login_API = (email, password, navigate) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//     siteId: 6,
//     userEmail: email,
//     userPassword: password,
//   });

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch(apiurl + "/userLogin", requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("ApiHit");
//       if (result.status === true) {
//         localStorage.setItem("result", JSON.stringify(result));
//         alert("Your Login successfull");
//         navigate("/dashboard");
//       }
//     })
//     .catch((error) => console.log("error", error));

//   return <div>Login_API</div>;
// };

export const Create_UserAPI = (user) => {
  console.log(user);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    roleId: user.rollId,
    siteId: user.siteId,
    status: user.status,
    userContact: user.contact,
    userEmail: user.email,
    userName: user.name,
    userPassword: user.password,
    managerId: 1,
    // managerId: 1,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl + "/addUser?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status == true) {
        swal("Good job!", result.message, "success");
      } else {
        swal("Alert!", "Something went wrong", "error");
      }
    })
    .catch((error) => console.log("error", error));
};
