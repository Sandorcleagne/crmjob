import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiurl, authCode } from "../../Host";
import { useSelector } from "react-redux";
import Simple_Input from "../../Custom-Components/Simple_Input";
import Simple_Select from "../../Custom-Components/Simple_Select";
import Form_Button from "../../Custom-Components/Form_Button";
import swal from "sweetalert";
import LeadsModal from "./Modals/LeadsModal";
import { getLeadStatusHistory, updateLeadNote } from "../../API/Lead_API";
import Load from "../../Image/loader.json";
import Lottie from "react-lottie";
import Form_Radio from "../../Custom-Components/Form_Radio";
import DataTable from "react-data-table-component";
import LeadsCommentsModal from "./Modals/LeadsCommentsModal";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import RadioGroup from "@mui/material/RadioGroup";
import useGetLead from "../../Hooks/useGetLead";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { searchByPhoneApi } from "../../API/SearchByPhoneApi";
import { dispositions } from "../../utils/Options";
const ViewLeadsForm = () => {
  const [leads, setLeads] = useState([]);
  const [managers, setManagers] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [agents, setAgents] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, userData } = auth;
  var managerId = "";
  var managerName = "";
  var agentId = "";
  var agentName = "";
  var leadDisposition = "";
  var leadDispositionId = "";
  var leadComment = "";
  var searchEmail = "";
  var startDate = "";
  var endDate = "";
  var searchPhone = "";
  // Modal State
  const [modalShow, setModalShow] = useState(false);
  const [leadCommentModal, setLeadCommentModal] = useState(false);
  const [lastComment, setLastComment] = useState({});
  const [leadHistoryId, setLeadHistoryId] = useState({});
  const [check, setCheck] = useState([]);
  const [statusHistory, setStatusHistory] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const roleId = cookies.login.roleId;
  const navigate = useNavigate();
  // For Notes
  const [leadForNotes, setLeadForNotes] = useState({});
  const [notesHistory, setNotesHistroy] = useState({});

  const dangerStyle = {
    backgroundColor: "#FFF5F8",
    padding: "10px !important",
    color: "#F1416C",
    fontSize: "12px",
  };
  const sucessStyle = {
    backgroundColor: "#E8FFF3",
    padding: "10px !important",
    color: "#50CD89",
    fontSize: "12px",
  };
  const warning = {
    backgroundColor: "#FFFBEB",
    padding: "10px !important",
    color: "#E4B200",
    fontSize: "12px",
  };
  const blueStyle = {
    backgroundColor: "#EEF6FF",
    padding: "10px !important",
    color: "#3E97FF",
    fontSize: "12px",
  };
  const columns = [
    {
      name: "name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Contact",
      selector: "contact",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => (
        <a className="lead-email" onClick={() => openModal(row)}>
          {row.email}
        </a>
      ),
    },
    {
      name: "Date",
      selector: "createDate",
      sortable: true,
      cell: (row) => <a>{formatDate(row.createDate)}</a>,
    },
    {
      name: "Manager",
      selector: "managerName",
      sortable: true,
      style: {
        color: "green",
        "font-weight": "bold",
      },
    },
    {
      name: "Hr-Executive",
      selector: "agentName",
      sortable: true,
      style: {
        color: "red",
        "font-weight": "bold",
      },
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) =>
        row.dispositionId === 1 ? (
          <span className="badge" style={sucessStyle}>
            Call Back
          </span>
        ) : row.dispositionId === 2 ? (
          <span className="badge" style={dangerStyle}>
            Not Interested
          </span>
        ) : row.dispositionId === 3 ? (
          <span className="badge" style={dangerStyle}>
            Not Answer
          </span>
        ) : row.dispositionId === 4 ? (
          <span className="badge" style={dangerStyle}>
            Irrelevant
          </span>
        ) : row.dispositionId === 5 ? (
          <span className="badge" style={sucessStyle}>
            Relevant
          </span>
        ) : row.dispositionId === 6 ? (
          <span className="badge" style={dangerStyle}>
            Number not valid
          </span>
        ) : row.dispositionId === 7 ? (
          <span className="badge" style={blueStyle}>
            Already Contacted
          </span>
        ) : row.dispositionId === 8 ? (
          <span className="badge" style={blueStyle}>
            Follow Up
          </span>
        ) : row.dispositionId === 9 ? (
          <span className="badge" style={warning}>
            Already Selected
          </span>
        ) : row.dispositionId === 10 ? (
          <span className="badge" style={dangerStyle}>
            Back Out
          </span>
        ) : row.dispositionId === 11 ? (
          <span className="badge" style={dangerStyle}>
            Not Looking For Job Change
          </span>
        ) : row.dispositionId === 12 ? (
          <span className="badge" style={warning}>
            Expensive as per slab
          </span>
        ) : (
          ""
        ),
    },
    {
      name: "Comment",
      sortable: true,
      cell: (row) => (
        <Simple_Input
          className="form-outline"
          onChange={(e) => getLeadComment(e)}
        />
      ),
    },
    {
      name: "Disposition",
      sortable: true,
      cell: (row) => (
        <Simple_Select
          dropdown={dispositions}
          id="status"
          name="status"
          onChange={(e) => getDisposition(e)}
        />
      ),
    },
    {
      name: "Action",
      sortable: true,
      cell: (row) => (
        <div
          className="btn-group-s d-flex"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className="btn btn-success mw-auto mx-1"
            onClick={(e) => updateLeadDisposition(row)}
          >
            <i className="fa-solid fa-check"></i>
          </button>
          <button
            type="button"
            className="btn btn-warning mw-auto mx-1"
            onClick={() => showNotesModal(row)}
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      ),
    },
    {},
  ];
  const leadHistoryIdLength = Object.keys(leadHistoryId).length;

  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  const getLeads = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${apiurl}getLeads/${cookies.login.roleId}/${cookies.login.userId}?authCode=${authCode}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLeads(result);
      })
      .catch((error) => console.log("error", error));
  };
  /* --------------------------------------------------APi Call----------------------------------------------- */
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

  /* --------------------------------------------------APi Call----------------------------------------------- */
  /* --------------------------------------------------Functions Call----------------------------------------------- */

  const SelectItem = (e) => {
    if (e) {
      setCheck(e.selectedRows);
      // check.push(item);
    } else {
      // check.pop(item);
    }
  };

  const getManager = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[idx];
    const name = option.getAttribute("name");
    managerName = name;
    managerId = e.target.value;
  };

  const getAgent = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[idx];
    const name = option.getAttribute("name");
    agentName = name;
    agentId = e.target.value;
  };

  const getDispositionId = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[idx];
    const id = option.getAttribute("id");
    leadDispositionId = id;
  };

  const getLeadComment = (e) => {
    leadComment = e.target.value;
  };

  const getDisposition = (e) => {
    getDispositionId(e);
    leadDisposition = e.target.value;
  };

  /* --------------------------------------------------Functions Call----------------------------------------------- */

  const updateLeadDisposition = (row) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment: leadComment,
      disposition: leadDisposition,
      leadId: row.id,
      userId: auth.userData.userId,
      userName: auth.userData.userName,
      dispositionId: leadDispositionId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(apiurl + "/updateLeadStatus?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode == 200) {
          swal("Good job!", result.message, "success");
        } else {
          swal("Alert!", result.message, "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updateMangers = () => {
    check.map((item, i) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        leadId: item.id,
        managerId: managerId,
        managerName: managerName,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        apiurl + "/distributeLeadManager?authCode=" + authCode,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.id != null) {
            swal("Good job!", "Distributed to Manager", "success");
            setRefreshPage(!refreshPage);
          }
        })
        .catch((error) => console.log("error", error));
    });
  };

  const updateAgents = () => {
    check.map((item, i) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        leadId: item.id,
        agentId: agentId,
        agentName: agentName,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        apiurl + "/distributeLeadAgent?authCode=" + authCode,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.id != null) {
            swal("Good job!", "Distributed to Executive", "success");
          }
        })
        .catch((error) => console.log("error", error));
    });
  };

  const setSearchPhone = (e) => {
    searchPhone = e.target.value;
  };
  const setEmail = (e) => {
    searchEmail = e.target.value;
  };

  const setStartDate = (e) => {
    startDate = e.target.value;
  };

  const setEndDate = (e) => {
    endDate = e.target.value;
  };
  const searchByPhone = async () => {
    const data = await searchByPhoneApi(searchPhone);
    const result = data.data;
    setLeads(result);
  };
  const searchByEmail = () => {
    setLoaderStatus(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url =
      apiurl +
      "getSearchByEmail/" +
      searchEmail +
      "/" +
      cookies.login.roleId +
      "/" +
      cookies.login.userId +
      "?authCode=" +
      authCode;
    console.log("url", url);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result2", result);
        setLeads(result);
        setLoaderStatus(false);
      })
      .catch((error) => console.log("error", error));
  };

  // const searchByPhone = () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };
  //   const APIURl =
  //     cookies.login.roleId === 2
  //       ? `${apiurl}/getByPhoneNumber/1/${cookies.login.userId}/${searchPhone}?authCode=${authCode}`
  //       : `${apiurl}/getByPhoneNumber/${cookies.login.roleId}/${cookies.login.userId}/${searchPhone}?authCode=${authCode}`;
  //   fetch(APIURl, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("result3", result);
  //       setLeads(result);
  //       setLoaderStatus(false);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const getLeadsByDateFilter = () => {
    setLoaderStatus(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      endDate: endDate,
      rollId: cookies.login.roleId,
      startDate: startDate,
      userId: cookies.login.userId,
    });
    console.log("raw:", raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiurl + "/getLeadsByDate?authCode=" + authCode, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result4", result);
        setLeads(result);
        setLoaderStatus(false);
      })
      .catch((error) => console.log("error", error));
  };

  const showLeadHistroy = (lead) => {
    console.log("lead", lead);
    setLeadHistoryId(lead);
    setModalShow(true);
  };

  // console.log("Managers",managers);
  const openModal = (item) => {
    console.log("item", item);
    showLeadHistroy(item);
    getLeadStatusHistory({ lead: item.id, setStatusHistory });
  };

  const showNotesModal = (item) => {
    setLeadForNotes(item);
    setLeadCommentModal(true);
    // Call API and Put in State
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/getLeadNotesHistory/" + item.id + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result !== null) {
          setNotesHistroy(result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updateLeadNotes = () => {
    setLeadCommentModal(false);
    updateLeadNote(notesHistory, cookies.login, leadForNotes);
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
        "getLeadsByAgentId/" +
        cookies.login.roleId +
        "/" +
        cookies.login.userId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result5", result);
        setLeads(result);
        setLoaderStatus(false);
      })
      .catch((error) => console.log("error", error));
    // }
  };

  const getLeadsByDisposition = (e) => {
    setLoaderStatus(false);
    if (e.target.checked) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const APIURl =
        // userData.roleId === 2
        //   ? `${apiurl}/getByDispositionId/1/${cookies.login.userId}/${e.target.value}?authCode=${authCode}`:
        `${apiurl}/getByDispositionId/${cookies.login.roleId}/${cookies.login.userId}/${e.target.value}?authCode=${authCode}`;

      fetch(APIURl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("result6", result);
          setLeads(result);

          setLoaderStatus(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const hideNotesModal = () => {
    setLeadCommentModal(false);
  };

  const clearFilters = () => {
    getLeads();
  };

  const autoDistributeAgents = () => {
    swal({
      title: "Are you sure?",
      text: "All not assgined leads will be distributed randomly amoung active agents",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(apiurl + "/autoDistribute?authCode=" + authCode, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.statusCode) {
              swal(result.message, {
                icon: "success",
              });
            } else {
              swal("Something went Wrong Contact Development Team");
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        swal("You can distribute manualy");
      }
    });
  };

  useEffect(() => {
    getLeads();
    getActiveManagers();
    getActiveAgents();
    if (cookies.login.roleId === 2 || cookies.login.roleId === "2") {
      getLeadsByAgent();
    }
  }, [refreshPage]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Load,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleUpdateNotes = (e, name) => {
    setNotesHistroy({ ...notesHistory, [name]: e.target.value });
  };

  return (
    <>
      <div className="form-container clearfix">
        <div className="form-box spaces">
          <div className="container">
            <h1 className="form-head">Jobs Leads</h1>
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
                  <label class="flaot-labelbm">Email</label>
                  <div className="form-outline">
                    <input
                      type="search"
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
                  <label class="flaot-labelbm">Start Date</label>
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
                  <label class="flaot-labelbm">End Date</label>
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
              <div className="col-12 text-right">
                <hr class="bsub-topline mt-2"></hr>
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
                  endIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        {loaderStatus ? (
          <div className="loader-lotti">
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>
        ) : (
          ""
        )}

        <div className={loaderStatus ? "parent-form" : ""}>
          {cookies.login.roleId <= 3 ? (
            <div className="pt-4 pb-3 overflow-hidden form-box spaces">
              <div className="container">
                <div className="row"></div>
                <div className="row mt-2">
                  {cookies.login.roleId <= 3 ? (
                    <>
                      <div className="col-12 col-lg-4 col-xxl-3 form-group parent px-4">
                        {cookies.login.roleId <= 2 ? (
                          <>
                            <div className="form-group lfts mb-0 position-relative">
                              <label className="flaot-labelbm">
                                Active Hr Executive
                              </label>
                              <select
                                className="form-group"
                                onChange={(e) => getAgent(e)}
                                required
                              >
                                <option value="">-Please Select-</option>
                                {agents.map((item) => {
                                  return (
                                    <option
                                      value={item.id}
                                      name={item.userName}
                                    >
                                      {item.userName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="form-group rht">
                              <Form_Button onClick={(e) => updateAgents()} />
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        <hr class="bsub-topline my-4 mx-0"></hr>
                        {cookies.login.roleId === 1 ? (
                          <>
                            <div className="form-group position-relative">
                              <label className="flaot-labelbm">
                                Active Managers
                              </label>
                              <select
                                className="mb-btmsp form-group mb-0"
                                onChange={(e) => getManager(e)}
                                required
                              >
                                <option value="">-Please Select-</option>
                                {managers.map((item) => {
                                  return (
                                    <option
                                      value={item.id}
                                      name={item.userName}
                                    >
                                      {item.userName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="form-group rht">
                              <Form_Button onClick={(e) => updateMangers()} />
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 col-lg-8 col-xxl-9 form-group  px-4">
                        <a
                          className="clear-btn btn"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Clear Filters"
                          onClick={() => clearFilters()}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </a>
                        {roleId <= 2 ? (
                          <a
                            className="clear-btn-success btn"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Auto Distribute Leads"
                            onClick={() => autoDistributeAgents()}
                          >
                            <i className="fa-solid fa-business-time"></i>
                          </a>
                        ) : (
                          ""
                        )}
                        {roleId !== 2 ? (
                          <div className="filter-box-1 mb-0">
                            <h1 class="form-head mx-0 px-0 mb-4">
                              Filter hr Executive
                            </h1>
                            <RadioGroup
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <div className="row lbexcute">
                                {agents.map((item) => {
                                  return (
                                    <div class="col-12 col-md-6 col-xxl-4 form-group">
                                      <Form_Radio
                                        label={item.userName}
                                        id={item.id}
                                        value={item.id}
                                        name="filter-radio"
                                        onChange={(e) => getLeadsByAgent(e)}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </RadioGroup>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="filter-box-2">
                          <label className="custom mb-3">
                            Filter Disposition
                          </label>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <div className="row lbexcute">
                              {dispositions.map((item) => {
                                return (
                                  <div class="col-12 col-md-6 col-xxl-4 form-group">
                                    <Form_Radio
                                      label={item.name}
                                      id={item.id}
                                      value={item.id}
                                      name="filter-radio"
                                      onChange={(e) => getLeadsByDisposition(e)}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </RadioGroup>
                        </div>
                        {roleId <= 2 ? (
                          <div className="row lbexcute">
                            <label className="custom">Filter by Category</label>
                            <div className="col-12 col-md-6 col-xxl-4 form-group">
                              <Form_Radio
                                label="Distributed"
                                id="distributed"
                                name="categoryRadio"
                              />
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4 form-group">
                              <Form_Radio
                                label="Undistriburted"
                                id="undistributed"
                                name="categoryRadio"
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="overflow-hidden form-box spaces lead-list-tabel clearfix">
            <div className="leads btn-ui-site">
              <DataTable
                columns={columns}
                data={leads}
                noHeader
                defaultSortField="id"
                paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                defaultSortAsc={false}
                pagination
                highlightOnHover
                selectableRows
                selectableRowsVisibleOnly
                onSelectedRowsChange={(e) => SelectItem(e)}
                // conditionalRowStyles={conditionalRowStyles}
              />
            </div>
          </div>
        </div>
        {/* Modal */}
        {leadHistoryIdLength !== 0 && (
          <LeadsModal
            modalShow={modalShow}
            show={modalShow}
            lead={leadHistoryId}
            statusHistory={statusHistory}
            onHide={() => setModalShow(false)}
          />
        )}

        <LeadsCommentsModal
          modalShow={leadCommentModal}
          show={leadCommentModal}
          onHide={() => hideNotesModal()}
          onSave={() => updateLeadNotes()}
          //  Send API CALLED DATA USING PROPS
          oldNotes={notesHistory}
          handleUpdateNotes={handleUpdateNotes}
        />
      </div>
    </>
  );
};

export default ViewLeadsForm;
