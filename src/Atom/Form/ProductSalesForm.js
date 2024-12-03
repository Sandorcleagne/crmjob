import React, { useEffect, useState } from "react";
import Load from "../../Image/product-loader.json";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiurl, authCode } from "../../Host";

const ProductSalesForm = ({productId}) => {
  const [loader, setLoader] = useState(false);
  const [bookings,setBookings] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const getAllBookings = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(apiurl+"/getBookingByProductId/"+productId.productId+"?authCode="+authCode, requestOptions)
        .then(response => response.json())
        .then(result => {
            setBookings(result);
        })
        .catch(error => console.log('error', error));
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Load,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getAllBookings();
  }, []);
  return (
    <div className="form-box clearfix">
      <div className="container form-content"></div>
      <h1 className="form-head">
        <i className="fa-solid page-icon fa-ticket"></i>
        &nbsp;Bookings
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
          {bookings.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.bookingId}</td>
                <td>{item.givenName}</td>
                <td>{item.email}</td>
                <td>{item.createDate}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/Booking/Edit/" + item.id + "")}
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

export default ProductSalesForm;
