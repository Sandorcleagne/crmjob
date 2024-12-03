import React, { useEffect, useState } from "react";
import { apiurl, authCode } from "../../Host";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Select from "../../Custom-Components/Form_Select";
import { useSelector } from "react-redux";
import Form_Button from "../../Custom-Components/Form_Button";
import Users_API from "../../API/Users_API";
import { useParams } from "react-router";

const EditUserForm = () => {
  const userId = useParams();

  const rolls = [
    { id: 1, name: "Admin", value: "1" },
    { id: 2, name: "Manager", value: "2" },
    { id: 3, name: "Agent", value: "3" },
    { id: 4, name: "Product", value: "4" },
  ];
  const rollsForManger = [
    { id: 3, name: "Agent", value: "3" },
    { id: 4, name: "Product", value: "4" },
  ];
  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];
  const auth = useSelector((state) => state.auth);
  const [editUser, setEditUser] = useState({});
  const sites = [{ id: 1, name: "Travomint-Job", value: 1 }];
  const [activeMangers, setActiveMangers] = useState([]);

  const getManagers = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(apiurl + "/getAllManagers/2?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setActiveMangers(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getUserDeatils = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/getUserDetails/" + userId.userId + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEditUser(result);
      })
      .catch((error) => console.log("error", error));
  };

  const GetValue = (e, name) => {
    setEditUser({ ...editUser, [name]: e.target.value });
  };

  const SubmitEditUser = (e) => {
    e.preventDefault();
    Users_API(editUser);
  };

  useEffect(() => {
    getManagers();
    getUserDeatils();
  }, []);

  console.log(editUser);
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-users"></i>&nbsp;Edit User <i class="fa-solid fa-angle-right anglpdod"></i> 
          <span className="form-head-product">{editUser.userName}</span>
        </h1>
        <form onSubmit={SubmitEditUser}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="siteId"
              dropdown={sites}
              id="siteId"
              value={editUser.siteId}
              onChange={(e) => GetValue(e, "siteId")}
            />
            <Form_Input
              label="User Name"
              name="userName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="userName"
              value={editUser.userName}
              onChange={(e) => GetValue(e, "userName")}
            />
            <Form_Input
              label="User Email"
              name="userEmail"
              div_className="col-12 col-md-6 col-xxl-4"
              id="userEmail"
              value={editUser.userEmail}
              onChange={(e) => GetValue(e, "userEmail")}
            />
            <Form_Input
              label="User Password"
              name="userPassword"
              div_className="col-12 col-md-6 col-xxl-4"
              id="userPassword"
              value={editUser.userPassword}
              onChange={(e) => GetValue(e, "userPassword")}
            />
            <Form_Input
              label="User Contact"
              name="userContact"
              div_className="col-12 col-md-6 col-xxl-4"
              id="userContact"
              value={editUser.userContact}
              onChange={(e) => GetValue(e, "userContact")}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="status"
              value={editUser.status}
              onChange={(e) => GetValue(e, "status")}
            />

            <Form_Select
              label="Roll"
              dropdown={auth.userData.roleId === 1 ? rolls : rollsForManger}
              id="roleId"
              name="roleId"
              value={editUser.roleId}
              onChange={(e) => GetValue(e, "roleId")}
            />

            {auth.userData.roleId === 1 ? (
              <Form_Select
                label="Manager"
                dropdown={activeMangers}
                id="managerId"
                name="managerId"
                value={editUser.managerId}
                onChange={(e) => GetValue(e, "managerId")}
              />
            ) : (
              <Form_Select
                label="Manager"
                dropdown={activeMangers}
                id="managerId"
                name="managerId"
                value={(editUser.managerId = auth.userData.userId)}
                onChange={(e) => GetValue(e, "managerId")}
                disabled="true"
              />
            )}
            <div className="col-12">
              <hr class="bsub-topline"></hr>
            </div>

            <Form_Button div_className="col-12 col-md-6 col-xxl-4" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
/*      */
