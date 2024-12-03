import React, { useEffect, useState } from "react";
import Load from "../../Image/product-loader.json";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiurl, authCode } from "../../Host";
import swal from "sweetalert";

const ViewBookingList = () => {
  const [loader, setLoader] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  var startDate = "";
  var endDate = "";
  var bookingId = "";

  const getAllBookings = () => {
    setLoader(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
      "/getAllBookingsCRM/" +
      auth.userData.roleId +
      "/" +
      auth.userData.userId +
      "?authCode=" +
      authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setBookings(result);
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Load,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getLeadsByDate = () => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      endDate: endDate,
      rollId: auth.userData.roleId,
      startDate: startDate,
      userId: auth.userData.userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiurl + "/getBookingByDates?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBookings(result);
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };

  const getByBookingId = () => {
    setLoader(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
      "/getBookingByBookingId/" +
      auth.userData.roleId +
      "/" +
      auth.userData.userId +
      "/" +
      bookingId +
      "?authCode=" +
      authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setBookings(result);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        swal("Alert!", "No Data Found", "error");
      });
  };

  const setSearchBookingId = (e) => {
    bookingId = e.target.value;
  };

  const setStartDate = (e) => {
    startDate = e.target.value;
  };

  const setEndDate = (e) => {
    endDate = e.target.value;
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  return (
    <>
      <div className="form-box clearfix">
        <div className="container">
          <h1 className="form-head">
            <i className="fa-solid page-icon fa-ticket"></i>
            &nbsp;Bookings
          </h1>
          <div className="row">
            <div className="col-3">
              <div className="search-leads">
                <div className="form-outline">
                  <input
                    type="search"
                    id="form1"
                    className="form-control"
                    placeholder="Search Booking Id"
                    onChange={(e) => setSearchBookingId(e)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => getByBookingId()}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            <div className="col-3">
              <div className="search-leads">
                <div className="form-outline">
                  <input
                    type="date"
                    id="form1"
                    className="form-control"
                    placeholder="Start Date"
                    onChange={(e) => setStartDate(e)}
                  />
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="search-leads">
                <div className="form-outline">
                  <input
                    type="date"
                    id="form1"
                    className="form-control"
                    placeholder="End Date"
                    onChange={(e) => setEndDate(e)}
                  />
                </div>
              </div>
            </div>
            <div className="col-3">
              <button
                className="btn btn-danger"
                onClick={() => getLeadsByDate()}
              >
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader ? (
        <div className="loader-lotti">
          <Lottie options={defaultOptions} height={250} width={250} />
        </div>
      ) : (
        ""
      )}
      <div className={loader ? "parent-form form-box" : "form-box clearfix"}>
        <div className="container form-content"></div>
        {/* <h1 className="form-head">
          <i className="fa-solid page-icon fa-ticket"></i>
          &nbsp;Bookings
        </h1> */}
        <Table responsive="sm">
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
                  {/* <button
                    className="btn btn-success  mw-auto"
                    onClick={() => navigate("/Booking/Edit/" + item.id + "")}
                  >
                    Edit
                  </button> */}
                  <div
                    className="btn-group-s d-flex"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      className="btn btn-success  mw-auto mx-1"
                      onClick={() => navigate("/Booking/Edit/" + item.id + "")}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning mx-1"
                      onClick={() => navigate("/Booking/Document/" + item.bookingId + "/" + item.id + "")}
                    >
                      <i className="fa-solid fa-file"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ViewBookingList;
