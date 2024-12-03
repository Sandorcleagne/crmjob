import React from "react";
import swal from "sweetalert";
import { apiurl, authCode } from "../Host";

export const VaccationType_API = async (vaccationType) => {
  console.log("VaccationForm", vaccationType);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: vaccationType.countryId,
    imageName: "string",
    metaDescription: vaccationType.metaDescription,
    metaKeywords: vaccationType.metaKeywords,
    metaTitle: vaccationType.metaTitle,
    name: vaccationType.name,
    packageId: vaccationType.packageId,
    siteId: vaccationType.siteId,
    status: vaccationType.status,
    userId: 0,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl +
      "/updateVaccationTypeById/" +
      vaccationType.id +
      "?authCode=" +
      authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.name != "" && result.id != "") {
        swal("Good job!", result.id + " Updated Successfully", "success");
      } else {
        swal("Alert!", "Something Went Wrong", result.message, "error");
      }
    })
    .catch((error) => console.log("error", error));
};

export const Add_VaccationType = async (vaccationType) => {
  console.log("adding Vaacation Type", vaccationType);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: vaccationType.countryid,
    imageName: "empty",
    metaDescription: vaccationType.metaDescription,
    metaKeywords: vaccationType.metaKeywords,
    metaTitle: vaccationType.metaTittle,
    name: vaccationType.vaccationTypeName,
    packageId: vaccationType.packageId,
    siteId: vaccationType.site,
    status: vaccationType.vaccationTypeStatus,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl + "/addVaccations?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.message == "VaccationType Saved Successfully") {
        swal("Good job!", " Added Successfully", "success");
      } else {
        swal("Alert!", "Something Went Wrong", "error");
      }
    })
    .catch((error) => console.log("error", error));
};
