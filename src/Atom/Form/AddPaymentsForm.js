import React, { useEffect, useState } from "react";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import { useSelector } from "react-redux";
import { Create_Payment } from "../../API/Booking_API";
import { useNavigate } from "react-router";

const AddPaymentsForm = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [payment, setPayment] = useState({
    amount: 0,
    bookingId: "",
    customerEmail: "",
    paymentGateway: "",
    paymentMode: "",
    transactionId: "",
    userId: auth.userData.userId,
    userName: auth.userData.userName,
    customerName: "",
    leadId:"",
  });
  const [emailStatus, setEmailStatus] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [lead, setLead] = useState({});
  const [getter,setGetter] = useState("Alredy Exist!");
  const paymentModes = [
    { id: "Net Banking", name: "Net Banking", value: "Net Banking" },
    { id: "Debit Card", name: "Debit Card", value: "Debit Card" },
    { id: "Credit Card", name: "Credit Card", value: "Credit Card" },
    { id: "UPI", name: "UPI", value: "UPI" },
    { id: "Wallet", name: "Wallet", value: "Wallet" },
  ];
  const checkLead = (e) => {
    GetValue(e);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/getByEmail/" + e.target.value + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.email != null) {
          setEmailText(
            result.email +
              " Already exist Customer " +
              result.name +
              " " +
              result.leadCode
          );
          setEmailStatus(true);
          setLead(result);
          setGetter("");
        } else {
          setEmailStatus(false);
          setEmailText(null);
        }
      })
      .catch((error) => {
        setEmailStatus(false);
        setEmailText(null);
      });
  };
 
  const GetValue = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };
  const SubmitPayment = (e) => {
    e.preventDefault();
    Create_Payment(payment,lead,navigate);
  };

  // console.log("payment ",payment)
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-money-bill"></i>&nbsp;Add Payments
        </h1>
        <form onSubmit={SubmitPayment}>
          <div className="row">
            <Form_Input
              label="Customer Name"
              name="customerName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="customerName"
              value={payment.customerName}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Transaction ID"
              name="transactionId"
              div_className="col-12 col-md-6 col-xxl-4"
              id="transactionId"
              value={payment.transactionId}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Booking Id"
              name="bookingId"
              div_className="col-12 col-md-6 col-xxl-4"
              id="bookingId"
              value={payment.bookingId}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Customer Email"
              name="customerEmail"
              div_className="col-12 col-md-6 col-xxl-4"
              id="customerEmail"
              value={payment.customerEmail}
              onChange={(e) => checkLead(e)}
              condition={emailStatus ? "input-success" : "input-error"}
                  conditionValueclassName={
                    emailStatus
                      ? "input-success-message"
                      : "input-error-message"
                  }
                  conditionValue={emailText}
            />
            <Form_Input
              label="Amount"
              name="amount"
              div_className="col-12 col-md-6 col-xxl-4"
              id="amount"
              value={payment.amount}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Payment Gatway"
              name="paymentGateway"
              div_className="col-12 col-md-6 col-xxl-4"
              id="paymentGateway"
              value={payment.paymentGateway}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Payment Mode"
              dropdown={paymentModes}
              id="paymentMode"
              name="paymentMode"
              value={payment.paymentMode}
              onChange={(e) => GetValue(e)}
            />
            <Form_Button_Edit getter={getter}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentsForm;
