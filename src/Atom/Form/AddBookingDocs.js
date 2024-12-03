import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { async } from "rxjs/internal/scheduler/async";
import { Upload_Docs } from "../../API/Booking_API";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import { useSelector } from "react-redux";
import { apiurl, authCode } from "../../Host";
import { Table } from "react-bootstrap";
import swal from "sweetalert";

const AddBookingDocs = ({ bookingId, bookingDBID }) => {
  const auth = useSelector((state) => state.auth);
  const [oldDocs, setOldDocs] = useState([]);
  var fileName = "";

  const uploadDocuments = (e) => {
    swal({
      title: "Are you sure?",
      text:
        "Will be Uploaded as an attched Document for this BookingID - "+bookingId.bookingId,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var formdata = new FormData();
        formdata.append("file", e.target.files[0]);
        formdata.append("fileName", fileName);
        formdata.append("userName", auth.userData.userName);
        formdata.append("userId", auth.userData.userId);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        // console.log("Form Data", formdata);
        fetch(
          apiurl +
            "/uploadFiles/" +
            bookingId.bookingId +
            "/" +
            bookingDBID.bookingDBID +
            "?authCode=" +
            authCode,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.statusCode == 200) {
                swal("Good job!", result.message, "success");
                getExistingDocs();
              }
          })
          .catch((error) => console.log("error", error));
      } else {
        swal("Your request is cancelled", {
          icon: "error",
        });
      }
    });
  };

  const getFileName = (e) => {
    fileName = e.target.value;
  };

  const getExistingDocs = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getDocumentsByBookingId/" +
        bookingDBID.bookingDBID +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOldDocs(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getExistingDocs();
  }, []);
  return (
    <>
      <div className="form-box clearfix">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-ticket"></i>&nbsp;Add Documents <i class="fa-solid fa-angle-right anglpdod"></i> 
          <span className="form-head-product">{bookingId.bookingId}</span>
        </h1>
        <form>
          <div className="container form-content">
            <div className="row">
              <>
                <div className="col-3">
                  <Form_Input
                    label="Document Name"
                    type="text"
                    name="documentName"
                    onChange={(e) => getFileName(e)}
                  />
                </div>
                <div className="col-3">
                  <Form_Input
                    label="Document"
                    type="file"
                    name="document"
                    accept="application/pdf,image/jpeg"
                    onChange={(e) => uploadDocuments(e)}
                  />
                </div>
              </>
            </div>
          </div>
        </form>
      </div>
      <div className="form-box clearfix">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Date</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {oldDocs.map((item) => (
              <tr>
                <td>{item.documentName}</td>
                <td>{item.createDate}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={
                      "https://vacationjavaapi.travomint.com/idocs/resources/documents/" +
                      item.documentFileName
                    }
                    target="__black"
                  >
                    <b>Open</b>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AddBookingDocs;
