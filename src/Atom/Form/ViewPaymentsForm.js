import React, { useEffect, useState } from "react";
import Load from "../../Image/product-loader.json";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiurl, authCode } from "../../Host";

const ViewPaymentsForm = () => {
  const [loader, setLoader] = useState(false);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Load,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getAllPayments = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl+"/viewPayments?authCode="+authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPayments(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getAllPayments();
  }, []);
  return (
    <div className="form-box clearfix">
      <div className="container form-content"></div>
      <h1 className="form-head">
        <i className="fa-solid page-icon fa-ticket"></i>
        &nbsp;Payments
      </h1>
      {loader ? (
        <div className="loader-lotti">
          <Lottie options={defaultOptions} height={250} width={250} />
        </div>
      ) : (
        ""
      )}
      <Table responsive="sm" className={loader ? "parent-form" : ""}>
        <thead>
          <tr>
            <th>#Databases Id</th>
            <th>Booking Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.bookingId}</td>
              <td>{item.customerName}</td>
              <td>{item.customerEmail}</td>
              <td>{item.createDate}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/Payments/Edit/" + item.id + "")}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewPaymentsForm;
