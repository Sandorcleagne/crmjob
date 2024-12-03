
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Editor from "../../Custom-Components/Form_Editor";
import Form_Button from "../../Custom-Components/Form_Button";
import React, { useEffect, useState } from "react";
import { getValue } from "@mui/system";
import { Update_Booking } from "../../API/Booking_API";

const EditBookingForm = ({ bookingId }) => {
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
    const [editBooking,setEditBooking] = useState({});

    const GetContent = (e) => {
        setEditBooking({
          ...editBooking,
          [e.target.id]: e.target.getContent(),
        });
    };

    const GetValue = (e, name) => {
        setEditBooking({ ...editBooking, [name]: e.target.value });
    };

    const getBookingDetails = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiurl+"/getBookingDetails/"+bookingId.bookingId+"?authCode="+authCode, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setEditBooking(result);
            })
            .catch(error => console.log('error', error));
    }

    const SubmitEditBooking = (e) => {
        e.preventDefault();
        Update_Booking(editBooking.id,editBooking);
      };

    //   console.log("Edit Booking",editBooking);

    useEffect(() => {
        getBookingDetails()
      }, []);

    return (
        <div className='form-box'>
            <div className='container form-content'>
                <h1 className='form-head'><i className="fa-solid page-icon fa-ticket"></i>&nbsp;Edit Booking <i class="fa-solid fa-angle-right anglpdod"></i> 
                <span className="form-head-product">{editBooking.bookingId}</span>
                </h1>
                <form onSubmit={SubmitEditBooking}>
                    <div className='row'>
                        <Form_Input
                            label="Given Name"
                            name="givenName"
                            div_className="col-3"
                            id="givenName"
                            value={editBooking.givenName}
                            onChange={(e) => GetValue(e,"givenName")}
                        />
                        <Form_Input
                            label="Last Name"
                            name="lastName"
                            div_className="col-3"
                            id="lastName"
                            value={editBooking.lastName}
                            onChange={(e) => GetValue(e,"lastName")}
                        />
                        <Form_Input
                            label="D.O.B"
                            name="dob"
                            div_className="col-3"
                            id="dob"
                            value={editBooking.dob}
                            onChange={(e) => GetValue(e,"dob")}
                        />
                        <Form_Input
                            label="Email"
                            name="email"
                            div_className="col-3"
                            id="email"
                            value={editBooking.email}
                            required={true}
                            onChange={(e) => GetValue(e,"email")}
                        />
                        <Form_Input
                            label="Phone"
                            name="phone"
                            div_className="col-3"
                            id="phone"
                            type="tel"
                            value={editBooking.phone}
                            onChange={(e) => GetValue(e,"phone")}
                        />
                        <Form_Input
                            label="Zip Code"
                            name="zipCode"
                            div_className="col-3"
                            id="zipCode"
                            value={editBooking.zipCode}
                            onChange={(e) => GetValue(e,"zipCode")}
                        />
                        <Form_Input
                            label="Address"
                            name="address"
                            div_className="col-12 col-md-6 col-xxl-4"
                            id="address"
                            value={editBooking.address}
                            onChange={(e) => GetValue(e,"address")}
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
                            onChange={(e) => GetContent(e)}
                        />

                        <Form_Select
                            label="Payment Status"
                            dropdown={paymentStatus}
                            id="paymentStatus"
                            name="paymentStatus"
                            divclassName="col-3 form-group"
                            value={editBooking.paymentStatus}
                            onChange={(e) => GetValue(e,"paymentStatus")}
                        />

                        <Form_Select
                            label="Booking Status"
                            dropdown={bookingStatus}
                            id="bookingStatus"
                            name="bookingStatus"
                            divclassName="col-3 form-group"
                            value={editBooking.bookingStatus}
                            onChange={(e) => GetValue(e,"bookingStatus")}
                        />

                        <Form_Input
                            label="Amount"
                            name="amount"
                            div_className="col-3"
                            id="amount"
                            value={editBooking.amount}
                            onChange={(e) => GetValue(e,"amount")} 
                        />
                        <div className="col-12">
                            <hr class="bsub-topline"></hr>
                        </div>
                        <Form_Button div_className="col-3 submt" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBookingForm