import swal from "sweetalert";
import { apiurl, authCode } from "../Host";

export const DeleteImageByID = async (pID) => {
  var requestOptions = {
    method: "GET",

    redirect: "follow",
  };

  fetch(
    apiurl + "/deleteProductImage/" + pID + "?authCode=" + authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.statusCode === 200) {
        swal("Good job!", result.message, "success");
      } else {
        swal("Alert!", result.message, "error");
      }
    })
    .catch((error) => console.log("error", error));
};
