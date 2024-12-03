import React, { useEffect, useState } from "react";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Editor from "../../Custom-Components/Form_Editor";
import Form_Button from "../../Custom-Components/Form_Button";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";

const ViewBooking = ({ bookingId }) => {
  const navigate = useNavigate();
  const paymentStatus = [
    { id: 1, name: "Success", value: "Success" },
    { id: 2, name: "Pending", value: "Pending" },
    { id: 3, name: "Failed", value: "Failed" },
  ];
  const bookingStatus = [
    { id: 1, name: "Open", value: "Open" },
    { id: 2, name: "Closed", value: "Closed" },
    { id: 3, name: "Completed", value: "Completed" },
  ];
  const [editBooking, setEditBooking] = useState({});
  const [paymentHistory, setPaymentHistory] = useState([]);

  //   const GetContent = (e) => {
  //     setEditBooking({
  //       ...editBooking,
  //       [e.target.id]: e.target.getContent(),
  //     });
  //   };

  //   const GetValue = (e, name) => {
  //     setEditBooking({ ...editBooking, [name]: e.target.value });
  //   };

  const getPaymentHistory = (bookingId) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/getPaymentsByBookingId/" + bookingId + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPaymentHistory(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getBookingDetails = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getBookingDetails/" +
        bookingId.bookingId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEditBooking(result);
        getPaymentHistory(result.bookingId);
      })
      .catch((error) => console.log("error", error));
  };

  //   const SubmitEditBooking = (e) => {
  //     e.preventDefault();
  //     Update_Booking(editBooking.id, editBooking);
  //   };

  //   console.log("Edit Booking",editBooking);

  useEffect(() => {
    getBookingDetails();
  }, []);
  return (
    <>
      <div className="form-box clearfix">
        <div className="container form-content">
          <h1 className="form-head">
            <i className="fa-solid page-icon fa-ticket"></i>&nbsp;View Booking <i class="fa-solid fa-angle-right anglpdod"></i> 
            <span className="form-head-product">{editBooking.bookingId}</span>
          </h1>
          <form>
            <div className="row">
              <Form_Input
                label="Given Name"
                name="givenName"
                div_className="col-3"
                id="givenName"
                value={editBooking.givenName}
              />
              <Form_Input
                label="Last Name"
                name="lastName"
                div_className="col-3"
                id="lastName"
                value={editBooking.lastName}
              />
              <Form_Input
                label="D.O.B"
                name="dob"
                div_className="col-3"
                id="dob"
                value={editBooking.dob}
              />
              <Form_Input
                label="Email"
                name="email"
                div_className="col-3"
                id="email"
                value={editBooking.email}
                required={true}
              />
              <Form_Input
                label="Phone"
                name="phone"
                div_className="col-3"
                id="phone"
                type="tel"
                value={editBooking.phone}
              />
              <Form_Input
                label="Zip Code"
                name="zipCode"
                div_className="col-3"
                id="zipCode"
                value={editBooking.zipCode}
              />
              <Form_Input
                label="Address"
                name="address"
                div_className="col-12 col-md-6 col-xxl-4"
                id="address"
                value={editBooking.address}
              />

              <Form_Input
                label="Product Refrence"
                name="productRefrence"
                div_className="col-12 col-md-6 col-xxl-4"
                id="productRefrence"
                value={editBooking.productName}
              />

              {/* <Auto_Complete
                div_className="col-12 col-md-6 col-xxl-4"
                // options={products}
                label="Select Product Refrence"
                // setSelectedProducts={setSelectedProducts}
                /> */}

              <Form_Editor
                label="Booking Details"
                div_className="col-12"
                label_className="col-12 col-md-6 col-xxl-4"
                initaltext={editBooking.bookingDetails}
                id="bookingDetails"
              />

              <Form_Select
                label="Payment Status"
                dropdown={paymentStatus}
                id="paymentStatus"
                name="paymentStatus"
                divclassName="col-3 form-group"
                value={editBooking.paymentStatus}
              />

              <Form_Select
                label="Booking Status"
                dropdown={bookingStatus}
                id="bookingStatus"
                name="bookingStatus"
                divclassName="col-3 form-group"
                value={editBooking.bookingStatus}
              />

              

              <Form_Input
                label="Amount"
                name="amount"
                div_className="col-3"
                id="amount"
                value={editBooking.amount}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="form-box clearfix">
        <div className="container form-content">
          <h2 className="form-head">
            <i className="fa-solid page-icon fa-money-bill"></i>&nbsp;Payment
            History
          </h2>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Booking Id</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                {/* <th>User Id</th> */}
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item) => (
                <tr>
                  <td>{item.bookingId}</td>
                  <td>{item.amount}</td>
                  <td>{item.paymentMode}</td>
                  <td>{item.createDate}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/Payments/Edit/" + item.id + "")}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewBooking;
