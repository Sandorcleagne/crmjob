import React, { useEffect, useState } from "react";
import { apiurl, authCode, siteId } from "../../Host";
import Load from "../../Image/product-loader.json";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewAllUsersList = () => {
  const auth = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/getAllUsers/" + 1 + "/" + 1 + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => console.log("error", error));
  };

  const makeUserDeactive = (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/makeUserDeactivate/" + id + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        if (result.id != null) {
          swal("Good job!", "Just Deactivated " + result.userName, "success");
          getAllUsers();
        } else {
          swal("Alert!", "Something Went Erong", "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const makeUserActive = (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/makeUserActive/" + id + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.id != null) {
          swal("Good job!", "Just Activated" + result.userName, "success");
          getAllUsers();
        } else {
          swal("Alert!", "Something Went Erong", "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => getAllUsers(), []);
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid menu-icon page-icon fa-users fa-1x"></i> All
          Users
        </h1>
      </div>

      <div className="formbx-row tbal-us btn-ui-site">
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                >
                  #Databases Id
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                >
                  User Name
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                >
                  User Email
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                >
                  Status
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                >
                  Create Date
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                >
                  Action
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.userEmail}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.createDate}</TableCell>
                  <TableCell>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate("/dashboard/edit-user/" + item.id + "")
                      }
                    >
                      Edit
                    </button>
                  </TableCell>
                  <TableCell>
                    {item.status == 1 ? (
                      <button
                        className="btn btn-success"
                        onClick={() => makeUserDeactive(item.id)}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => makeUserActive(item.id)}
                      >
                        Deactive
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ViewAllUsersList;
