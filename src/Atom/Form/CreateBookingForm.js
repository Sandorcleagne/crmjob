import React, { useEffect, useState } from "react";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import Auto_Complete from "../../Custom-Components/Form_AutoComplete";
import Form_Grup_Input from "../../API/Checkl_Country";
import Simple_Input from "../../Custom-Components/Simple_Input";
import Form_Editor from "../../Custom-Components/Form_Editor";
import { apiurl, authCode } from "../../Host";
import { useSelector } from "react-redux";
import { Booking_API } from "../../API/Booking_API";
import { useNavigate } from "react-router";

const CreateBookingForm = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    address: "",
    amount: 0,
    bookingDetails: "",
    bookingStatus: "",
    dob: "",
    email: "",
    givenName: "",
    lastName: "",
    paymentStatus: "",
    phone: "",
    productId: "",
    productName: "",
    userId: "",
    userName: "",
    zipCode: 0,
    leadCode: "",
    leadId: "",
  });

  const [emailStatus, setEmailStatus] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [lead, setLead] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProducts] = useState({});
  const auth = useSelector((state) => state.auth);
  //  Document Upload Feature Start
  const [documentList, setDocumentList] = useState([
    {
      documentName: "",
      document: "",
    },
  ]);

  const handDocuments = (e, index) => {
    const { name, value } = e.target;
    const list = [...documentList];
    list[index][name] = value;
    setDocumentList(list);
  };
  //  Document Upload Feature End

  const addDocumentInputs = () => {
    setDocumentList([
      ...documentList,
      {
        documentName: "",
        document: "",
      },
    ]);
  };
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

  const getAllProducts = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/getProductsBySiteId/1?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      })
      .catch((error) => console.log("error", error));
  };

  const SubmitBooking = (e) => {
    e.preventDefault();
    Booking_API(booking, lead, auth.userData, navigate, selectedProduct);
  };

  const GetValue = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const GetContent = (e) => {
    setBooking({
      ...booking,
      [e.target.id]: e.target.getContent(),
    });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  // console.log("Booking ", booking);
  // console.log("Selected Products ", selectedProduct);
  // console.log("Document List",documentList);

  return (
    <>
      <div className="form-box clearfix">
        <div className="container form-content">
          <h1 className="form-head">
            <i className="fa-solid page-icon fa-ticket"></i>&nbsp;Create Booking
          </h1>
          <div className="form-group">
            <form onSubmit={SubmitBooking}>
              <div className="row">
                <Form_Input
                  label="Given Name"
                  name="givenName"
                  div_className="col-3"
                  id="givenName"
                  onChange={(e) => GetValue(e)}
                />
                <Form_Input
                  label="Last Name"
                  name="lastName"
                  div_className="col-3"
                  id="lastName"
                  onChange={(e) => GetValue(e)}
                />
                <Form_Input
                  label="D.O.B"
                  name="dob"
                  div_className="col-3"
                  type="date"
                  id="dob"
                  onChange={(e) => GetValue(e)}
                />
                <Form_Input
                  label="Email"
                  name="email"
                  div_className="col-3"
                  id="email"
                  type="email"
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
                  label="Phone"
                  name="phone"
                  div_className="col-3"
                  id="phone"
                  type="tel"
                  onChange={(e) => GetValue(e)}
                />
                <Form_Input
                  label="Zip Code"
                  name="zipCode"
                  div_className="col-3"
                  id="zipCode"
                  onChange={(e) => GetValue(e)}
                />
                <Form_Input
                  label="Address"
                  name="address"
                  div_className="col-12 col-md-6 col-xxl-4"
                  id="address"
                  onChange={(e) => GetValue(e)}
                />

                <Auto_Complete
                  div_className="col-12 col-md-6 col-xxl-4"
                  options={products}
                  label="Select Product Refrence"
                  setSelectedProducts={setSelectedProducts}
                />

                <Form_Editor
                  label="Booking Details"
                  div_className="col-12"
                  label_className="col-12 col-md-6 col-xxl-4"
                  initaltext="<p><strong>Flights -</strong></p>
                  <p>&nbsp;</p>
                  <p><strong>Hotels -</strong></p>
                  <p>&nbsp;</p>
                  <p><strong>Trains -<br></strong></p>
                  <p>&nbsp;</p>
                  <p><strong>Car -</strong></p>
                  <p>&nbsp;</p>
                  <p><strong>Additional Information -</strong></p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>"
                  id="bookingDetails"
                  onChange={(e) => GetContent(e)}
                />

                <Form_Select
                  label="Payment Status"
                  dropdown={paymentStatus}
                  id="paymentStatus"
                  name="paymentStatus"
                  divclassName="col-3"
                  onChange={(e) => GetValue(e)}
                />

                <Form_Select
                  label="Booking Status"
                  dropdown={bookingStatus}
                  id="bookingStatus"
                  name="bookingStatus"
                  divclassName="col-3"
                  onChange={(e) => GetValue(e)}
                />

                <Form_Input
                  label="Amount"
                  name="amount"
                  div_className="col-3"
                  id="amount"
                  onChange={(e) => GetValue(e)}
                />
                <Form_Button div_className="col-3 submt" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="form-box clearfix">
        <div className="container form-content">
          <div className="row">
              {documentList.map((x, i) =>
                <>
                  <div className="col-3">
                    <Form_Input label="Document Name" type="text" value={x.documentName} name="documentName" onChange={(e) =>handDocuments(e,i)}/>
                  </div>
                  <div className="col-3">
                    <Form_Input label="Document" type="file" value={x.document} name="document" onChange={(e) =>handDocuments(e,i)}/>
                  </div>
                </>
              )}
              <Form_Button onClick={addDocumentInputs}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBookingForm;
