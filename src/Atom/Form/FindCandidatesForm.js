import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { searchByPhoneApi } from "../../API/SearchByPhoneApi";
import { apiurl, authCode } from "../../Host";
import Button from "@mui/material/Button";
import { Send } from "@mui/icons-material";
import user from "../../Image/user.png";
import customersupport from "../../Image/customer-support.png";

const FindCandidatesForm = ({ setLead }) => {
  const [leads, setLeads] = useState([]);
  const [managers, setManagers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [startDates, setStartDates] = useState("");
  const [endDates, setEndDates] = useState("");
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const dispatch = useDispatch();
  var searchPhone = "";
  var searchEmail = "";
  const setSearchPhone = (e) => {
    searchPhone = e.target.value;
  };
  const setEmail = (e) => {
    searchEmail = e.target.value;
  };
  const setStartDate = (e) => {
    setStartDates(e.target.value);
  };
  const setEndDate = (e) => {
    setEndDates(e.target.value);
  };
  const getLeads = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getLeads/" +
        cookies.login.roleId +
        "/" +
        cookies.login.userId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLeads(result);
        dispatch({ type: "GETCANDIDATEINFO", payload: result });
      })
      .catch((error) => console.log("error", error));
  };
  const getActiveManagers = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(apiurl + "/getAllManagers/1/1?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setManagers(result);
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
  const searchByPhone = async () => {
    const data = await searchByPhoneApi(searchPhone);
    const result = data.data;
    setLead(result);
    console.log("result", result);
    dispatch({ type: "GETCANDIDATEINFO", payload: result });
  };
  const getLeadsByAgent = (e) => {
    setLoaderStatus(true);
    // if (e.target.checked) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getLeadsByAgentId/" +
        cookies.login.roleId +
        "/" +
        cookies.login.userId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLeads(result);
        setLead(result);
        dispatch({ type: "GETCANDIDATEINFO", payload: result });
        setLoaderStatus(false);
      })
      .catch((error) => console.log("error", error));
    // }
  };
  const searchByEmail = () => {
    setLoaderStatus(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getSearchByEmail/" +
        searchEmail +
        "/" +
        cookies.login.roleId +
        "/" +
        cookies.login.userId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLeads(result);
        setLead(result);
        dispatch({ type: "GETCANDIDATEINFO", payload: result });
        setLoaderStatus(false);
      })
      .catch((error) => console.log("error", error));
  };
  const getLeadsByDateFilter = () => {
    setLoaderStatus(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      endDate: endDates,
      rollId: cookies.login.roleId,
      startDate: startDates,
      userId: cookies.login.userId,
    });
    console.log("raw", raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiurl + "getLeadsByDate?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setLeads(result);
        setLead(result);
        dispatch({ type: "GETCANDIDATEINFO", payload: result });
        setLoaderStatus(false);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getLeads();
    getActiveManagers();
    getActiveAgents();
    if (cookies.login.roleId === 2 || cookies.login.roleId === "2") {
      getLeadsByAgent();
    }
  }, []);

  const { userEmail, userName } = cookies.login;

  return (
    <>
      <div className="form-box welcomebx-index py-0 overflow-hidden">
        <div className="row align-items-end text-center">
          <div className="col-md-6 align-self-center">
            <div className="d-inline-block">
              <div className=" py-1">
                <div className="dropposition">
                  <img src={user} className="user-logoutmenu-img" />
                </div>
                <div className="mt-2">
                  <h3 className="font-weight-bold">Welcome back!</h3>
                  <strong className="d-block">{userName}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img src={customersupport} className="user-customersupport" />
          </div>
        </div>
      </div>

      <div className="form-container clearfix">
        <div className="form-box spaces">
          <div className="container">
            <h1 className="form-head">Find Candidate</h1>
            <div className="row d-flex justify-content-center">
              <div className="col-3">
                <div className="search-leads">
                  <div className="form-outline">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Search Phone"
                      onChange={(e) => setSearchPhone(e)}
                      maxLength="10"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => searchByPhone()}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div className="col-3">
                <div className="search-leads">
                  <div className="form-outline">
                    <input
                      type="email"
                      id="form1"
                      className="form-control"
                      placeholder="Search Email"
                      onChange={(e) => setEmail(e)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => searchByEmail()}
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

              <div className="col-12 mt-4 text-right">
                <hr class="bsub-topline" />

                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => getLeadsByDateFilter()}
                  sx={{
                    height: "50px",
                    fontWeight: "700",
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: "17px",
                    minWidth: "160px",
                    backgroundColor: "#2a6ca8",
                    "&:hover": {
                      backgroundColor: "#115496",
                    },
                  }}
                  size="large"
                  endIcon={<Send />}
                >
                  SEARCH
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindCandidatesForm;
