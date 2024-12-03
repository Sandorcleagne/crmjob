import React from "react";
import swal from "sweetalert";
import { apiurl, authCode } from "../Host";

export const Country_API = async (countryValues) => {
  console.log(countryValues);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    imageName: "NA",
    metaDescription: countryValues.metaDescription,
    metaKeywords: countryValues.metaKeywords,
    metaTitle: countryValues.metaTitle,
    name: countryValues.countryName,
    siteId: countryValues.site,
    status: countryValues.countryStatus,
    userId: 1,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(apiurl + "/addCountry", requestOptions);
  const result = await response.json();
  if (result.statusCode === 200) {
    swal("Good job!", result.message, "success");
  } else {
    swal("Alert!", result.message, "error");
  }
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  // .catch((error) => console.log("error", error));
  //   return <div>Country_API</div>;
};

export const GetCountry = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(apiurl + "/getCountriesBySiteId/1", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log("result"))
    .catch((error) => console.log("error"));
};

export const UpdateCountry = (updatedValues) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: updatedValues.id,
    imageName: updatedValues.imageName,
    metaDescription: updatedValues.metaDescription,
    metaKeywords: updatedValues.metaKeywords,
    metaTitle: updatedValues.metaTitle,
    name: updatedValues.name,
    siteId: updatedValues.siteId,
    status: updatedValues.status,
    userId: 1,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl + "/updateCountryById/" + updatedValues.id + "?authCode=" + authCode,
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
    .catch((error) => console.log("error"));
};
