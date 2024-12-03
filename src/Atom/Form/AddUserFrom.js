import React from "react";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import State, { useEffect, useState } from "react";
import { FormSelect } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Create_UserAPI } from "../../API/Login_API";
import { useCookies } from "react-cookie";

const AddUserFrom = () => {
  const auth = useSelector((state) => state.auth);
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    rollId: "",
    status: "",
    siteId: "",
    managerId: "",
    agentId: "",
  });
  const [activeMangers, setActiveMangers] = useState([]);
  const [agents, setAgents] = useState([]);

  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];

  const sites = [{ id: 1, name: "Travomint-Job", value: 1 }];

  const rolls = [
    { id: 1, name: "Manager", value: 1 },
    { id: 2, name: "Executive", value: 2 },
  ];

  const rollsForManger = [
    { id: 1, name: "Manager", value: 1 },
    { id: 2, name: "Employee", value: 2 },
  ];

  const getManagers = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(apiurl + "getAllManagers/1/1?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setActiveMangers(result);
      })
      .catch((error) => console.log("error", error));
  };
  const getActiveAgents = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(apiurl + "getAllManagers/2/1?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAgents(result);
      })
      .catch((error) => console.log("error", error));
  };
  const GetValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const SubmitUser = (e) => {
    e.preventDefault();
    Create_UserAPI(user);
  };

  useEffect(() => {
    getManagers();
    getActiveAgents();
  }, []);

  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid fa-users fa-1x"></i> Add Users
        </h1>
        <form onSubmit={SubmitUser}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="siteId"
              dropdown={sites}
              id="siteId"
              value={user.siteId}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="User Name"
              name="name"
              div_className="col-12 col-md-6 col-xxl-4"
              id="name"
              value={user.name}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="User Email"
              name="email"
              div_className="col-12 col-md-6 col-xxl-4"
              id="email"
              value={user.email}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="User Password"
              name="password"
              div_className="col-12 col-md-6 col-xxl-4"
              id="password"
              value={user.password}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="User Contact"
              name="contact"
              div_className="col-12 col-md-6 col-xxl-4"
              id="contact"
              value={user.contact}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="status"
              value={user.status}
              onChange={(e) => GetValue(e)}
            />

            <Form_Select
              label="Role"
              dropdown={cookies.login.roleId === 1 ? rolls : rollsForManger}
              id="rollId"
              name="rollId"
              value={user.rollId}
              onChange={(e) => GetValue(e)}
            />

            {user.rollId === "2" ? (
              <Form_Select
                label="Manager"
                dropdown={activeMangers}
                id="managerId"
                name="managerId"
                value={user.managerId}
                onChange={(e) => GetValue(e, "managerId")}
                validate={user}
              />
            ) : (
              <Form_Select
                label="Manager"
                dropdown={activeMangers}
                id="managerId"
                name="managerId"
                value={(user.managerId = cookies.login.userId)}
                onChange={(e) => GetValue(e, "managerId")}
                disabled="true"
                validate={user}
              />
            )}
            <div className="col-12">
              <hr className="bsub-topline"></hr>
            </div>
            <Form_Button div_className="d-flex justify-content-center align-items-center mt-3" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserFrom;
