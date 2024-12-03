import React from "react";
import swal from "sweetalert";
import { apiurl, authCode } from "../Host";

export const Package_API = async (packageValues) => {
  console.log("Input Values", packageValues);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: packageValues.countryid,
    imageName: "string",
    metaDescription: packageValues.metaDescription,
    metaKeywords: packageValues.metaKeywords,
    metaTitle: packageValues.metaTitle,
    name: packageValues.packageName,
    siteId: packageValues.site,
    status: packageValues.packageStatus,
    userId: 1,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  console.log(JSON.parse(raw));
  const reponse = await fetch(
    apiurl + "/addPackages?authCode=" + authCode,
    requestOptions
  );
  const result = await reponse.json();
  if (result.statusCode === 200) {
    swal("Good job!", result.message, "success");
  } else {
    swal("Alert!", result.message, "error");
  }
};

export const UpdatePackage = (updatePackage) => {
  console.log(updatePackage);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: updatePackage.countryId,
    imageName: updatePackage.imageName,
    metaDescription: updatePackage.metaDescription,
    metaKeywords: updatePackage.metaKeywords,
    metaTitle: updatePackage.metaTitle,
    name: updatePackage.name,
    siteId: updatePackage.siteId,
    status: updatePackage.status,
    userId: updatePackage.userId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl+"/updatePackageById/"+updatePackage.id+"?authCode="+authCode,
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
