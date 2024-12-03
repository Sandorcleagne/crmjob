import Form_Input from "../../Custom-Components/Form_Input";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Editor from "../../Custom-Components/Form_Editor";
import Form_Button from "../../Custom-Components/Form_Button";
import React, { useEffect, useState } from "react";
import { Update_Payment } from "../../API/Booking_API";

const EditPaymentFrom = ({ paymentId }) => {
    const [getter,setGetter] = useState("Alredy Exist!");
  const [payment, setPayment] = useState({});
  const paymentModes = [
    { id: "Net Banking", name: "Net Banking", value: "Net Banking" },
    { id: "Debit Card", name: "Debit Card", value: "Debit Card" },
    { id: "Credit Card", name: "Credit Card", value: "Credit Card" },
    { id: "UPI", name: "UPI", value: "UPI" },
    { id: "Wallet", name: "Wallet", value: "Wallet" },
  ];

  const getPaymentDetails = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl+"/getPaymentDetails/"+paymentId.paymentId+"?authCode="+authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setPayment(result);
      })
      .catch((error) => console.log("error", error));
  };
  const GetValue = (e, name) => {
    setPayment({ ...payment, [name]: e.target.value });
  };
  const SubmitPayment = (e) =>{
    e.preventDefault();
    Update_Payment(payment);
  }
//   console.log("Edit Payment",payment);
  useEffect(() => {
    getPaymentDetails();
  }, []);
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-money-bill"></i>&nbsp;Edit/View Payment
        </h1>
        <form onSubmit={SubmitPayment}>
          <div className="row">
            <Form_Input
              label="Customer Name"
              name="customerName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="customerName"
              value={payment.customerName}
              onChange={(e) => GetValue(e,"customerName")}
            />
            <Form_Input
              label="Transaction ID"
              name="transactionId"
              div_className="col-12 col-md-6 col-xxl-4"
              id="transactionId"
              value={payment.transactionId}
              onChange={(e) => GetValue(e ,"transactionId")}
            />
            <Form_Input
              label="Booking Id"
              name="bookingId"
              div_className="col-12 col-md-6 col-xxl-4"
              id="bookingId"
              value={payment.bookingId}
              onChange={(e) => GetValue(e,"bookingId")}
            />
            <Form_Input
              label="Customer Email"
              name="customerEmail"
              div_className="col-12 col-md-6 col-xxl-4"
              id="customerEmail"
              value={payment.customerEmail}
                // onChange={(e) => checkLead(e)}
            />
            <Form_Input
              label="Amount"
              name="amount"
              div_className="col-12 col-md-6 col-xxl-4"
              id="amount"
              value={payment.amount}
              onChange={(e) => GetValue(e,"amount")}
            />
            <Form_Input
              label="Payment Gatway"
              name="paymentGateway"
              div_className="col-12 col-md-6 col-xxl-4"
              id="paymentGateway"
              value={payment.paymentGateway}
              onChange={(e) => GetValue(e,"paymentGateway")}
            />
            <Form_Input
              label="Payment Genrated By"
              name="paymentGenratedBy"
              div_className="col-12 col-md-6 col-xxl-4"
              id="paymentGenratedBy"
              value={payment.userName}
            //   onChange={(e) => GetValue(e,"paymentGateway")}
            />
            <Form_Select
              label="Payment Mode"
              dropdown={paymentModes}
              id="paymentMode"
              name="paymentMode"
              value={payment.paymentMode}
              onChange={(e) => GetValue(e ,"paymentMode")}
            />
            <Form_Button_Edit  />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaymentFrom;
