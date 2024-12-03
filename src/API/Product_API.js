import React from "react";
import { async } from "rxjs/internal/scheduler/async";

import swal from "sweetalert";
import { apiurl, authCode } from "../Host";

export const AddProduct_API = async (product, navigate) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: product.countryId,
    metaDescription: product.metaDescription,
    metaKeywords: product.metaKeywords,
    metaTitle: product.metaTitle,
    name: product.name,
    packageId: product.packageId,
    price: product.price,
    productCode: product.productCode,
    productDescription: product.productDescription,
    productShortDescription: product.productShortDescription,
    productTags: product.productTags,
    sellingPrice: product.sellingPrice,
    siteId: product.siteId,
    status: product.status,
    userId: "",
    vaccationTypeId: product.vaccationTypeId,
    locations: product.locations,
    productURL: product.productURL,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl + "/addProduct?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status == true) {
        swal("Good job!", result.message, "success");
        navigate("/viewProducts");
      } else {
        swal("Alert!", "Something Went Wrong", result.message, "error");
      }
    })
    .catch((error) => console.log("error", error));
};

export const EditProduct_API = async (product) => {
  console.log("Edited Values", product);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    countryId: product.countryId,
    imageName: product.imageName,
    metaDescription: product.metaDescription,
    metaKeywords: product.metaKeywords,
    metaTitle: product.metaTitle,
    name: product.name,
    packageId: product.packageId,
    price: product.price,
    productCode: product.productCode,
    productDescription: product.productDescription,
    productShortDescription: product.productShortDescription,
    productTags: product.productTags,
    sellingPrice: product.sellingPrice,
    siteId: product.siteId,
    status: product.status,
    userId: 0,
    vaccationTypeId: product.vaccationTypeId,
    locations: product.locations,
    productURL: product.productURL,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl + "/updateProductById/" + product.id + "?authCode=" + authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.id != null) {
        swal("Good job!", "Just Updated " + result.id, "success");
      } else {
        swal("Alert!", "Something Went Wrong", "error");
      }
    })
    .catch((error) => console.log("error", error));
};
