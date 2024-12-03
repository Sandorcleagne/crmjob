import React from "react";
import { apiurl, authCode } from "../Host";
import swal from "sweetalert";
import e from "cors";

export const Location_API = async (locationValues) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: locationValues.countryId,
    metaDescription: locationValues.metaDescription,
    metaKeywords: locationValues.metaKeywords,
    metaTitle: locationValues.metaTittle,
    name: locationValues.locationName,
    packageId: locationValues.packageId,
    siteId: locationValues.siteId,
    status: locationValues.status,
    vaccationId: locationValues.vaccationTypeId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    apiurl + "/addLocations?authCode=" + authCode,
    requestOptions
  );
  const result = await response.json();
  if (result.statusCode === 200) {
    swal("Good job!", result.message, "success");
  } else {
    swal("Alert!", result.message, "error");
  }
};

export const Update_Location_API = async (locationValues) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: locationValues.countryId,
    imageName: locationValues.imageName,
    metaDescription: locationValues.metaDescription,
    metaKeywords: locationValues.metaKeywords,
    metaTitle: locationValues.metaTitle,
    name: locationValues.name,
    packageId: locationValues.packageId,
    siteId: locationValues.siteId,
    status: locationValues.status,
    userId: 0,
    vaccationId: locationValues.vaccationId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl + "/updateLocationId/" + locationValues.id + "?authCode=" + authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.name != null) {
        swal("Good job!", result.id + " Updated Successfully", "success");
      } else {
        swal("Alert!", "Something Went Wrong", "error");
      }
    })
    .catch((error) => console.log("error", error));
};
