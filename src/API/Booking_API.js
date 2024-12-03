import React from "react";
import swal from "sweetalert";
import { apiurl, authCode } from "../Host";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Booking_API = (
  bookingDetails,
  lead,
  userData,
  navigate,
  product
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    address: bookingDetails.address,
    amount: bookingDetails.amount,
    bookingDetails: bookingDetails.bookingDetails,
    bookingStatus: bookingDetails.bookingStatus,
    dob: bookingDetails.dob,
    email: bookingDetails.email,
    givenName: bookingDetails.givenName,
    lastName: bookingDetails.lastName,
    // For Lead Details
    leadCode: lead.leadCode,
    leadId: lead.id,
    paymentStatus: bookingDetails.paymentStatus,
    phone: bookingDetails.phone,
    // Product Details
    productId: product.id,
    productName: product.val,
    // For User Details
    userId: userData.userId,
    userName: userData.userName,
    zipCode: bookingDetails.zipCode,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl + "/createBooking?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.id != null) {
        swal("Good Job!", result.message, "success");
        navigate("/bookingList");
      }
    })
    .catch((error) => console.log("error"));
};

export const Update_Booking = (id, bookingObj) => {
  var myHeaders = new Headers();

 
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    address: bookingObj.address,
    amount: bookingObj.amount,
    bookingDetails: bookingObj.bookingDetails,
    bookingStatus: bookingObj.bookingStatus,
    dob: bookingObj.dob,
    // email: bookingObj.email,
    givenName: bookingObj.givenName,
    lastName: bookingObj.lastName,
    // leadCode: bookingObj.leadCode,
    // leadId: bookingObj.,
    paymentStatus: bookingObj.paymentStatus,
    phone: bookingObj.phone,
    // productId: "string",
    // productName: "string",
    // userId: "string",
    // userName: "string",
    zipCode: bookingObj.zipCode,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl + "/updateBooking/" + id + "?authCode=" + authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.id != null) {
        swal("Good Job!", "You Just Updated" + result.bookingId, "success");
      } else {
        swal("Alert!", "Something Went Wrong", "error");
      }
    })
    .catch((error) => swal("Alert!", "Something Went Wrong", "error"));
};

export const Create_Payment = (payment, lead, navigate) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    amount: payment.amount,
    bookingId: payment.bookingId,
    customerEmail: payment.customerEmail,
    customerName: payment.customerName,
    paymentGateway: payment.paymentGateway,
    paymentMode: payment.paymentMode,
    transactionId: payment.transactionId,
    userId: payment.userId,
    userName: payment.userName,
    leadId: lead.id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl + "/createPayment?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.statusCode === 200) {
        navigate("/viewPayments");
        swal("Good Job!", "Payment Created", "success");
      } else {
        swal("Alert!", "Something Went Wrong", "error");
      }
    })
    .catch((error) => console.log("error"));
};

export const Update_Payment = (paymentObj) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    amount: paymentObj.amount,
    bookingId: paymentObj.bookingId,
    customerName: paymentObj.customerName,
    paymentGateway: paymentObj.paymentGateway,
    paymentMode: paymentObj.paymentMode,
    transactionId: paymentObj.transactionId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    apiurl + "/updatePayments/" + paymentObj.id + "?authCode=" + authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        swal(
          "Good Job!",
          "You Just Updated Payment Against BookingId " + result.bookingId,
          "success"
        );
      } else {
        swal("Alert!", "Something Went Wrong", "error");
      }
    })
    .catch((error) => {
      swal("Alert!", "Something Went Wrong", "error");
    });
};

export const Upload_Docs = (documentList) => {
  documentList.map((item, i) => {
  
    var formdata = new FormData();
    formdata.append("file", item.document.files);
    formdata.append("fileName", "Passport");
    formdata.append("userName", "Apaar Gupta");
    formdata.append("userId", "225d4sd");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    // console.log("Form Data", formdata);
    // fetch(
    //   "http://localhost:8080/uploadFiles/3321/huih4894984?authCode=Trav1124-APAR07",
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  });
};
