import React, { useEffect, useState } from "react";
import user from "../../Image/user.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../Redux/ActionTypes/ActionType";
import { useCookies } from "react-cookie";
import logo from "../../Image/snva-logoside-white.png";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import {
  interviewNotificationApi,
  joiningNotification,
} from "../../API/NotificationsApi";
import moment from "moment";
import { Link } from "react-router-dom";
const TopBar = () => {
  const [interviewLen, setInterviewLen] = useState(0);
  const [joiningLen, setJoiningLen] = useState(0);
  const [
    interviewNotificationForSlice,
    setInterviewNotificationForSlice,
  ] = useState([]);
  const [
    joiningNotificationForSlice,
    setJoiningNotificationForSlice,
  ] = useState([]);
  const slicedInterviewNotification =
    interviewNotificationForSlice.length === 0
      ? []
      : interviewNotificationForSlice.slice(0, 2);
  const slicedJoiningNotification =
    joiningNotificationForSlice.length === 0
      ? []
      : joiningNotificationForSlice.slice(0, 2);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["LOGIN"]);
  const { userEmail, userName } = cookies.login;
  const logout = () => {
    dispatch({ type: LOGOUT, payload: null });
    navigate("/");
    removeCookie("login");
    removeCookie("token");
    console.log("cookies", cookies);
  };

  let name = localStorage.getItem("name");
  let Phone = localStorage.getItem("phone");

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const showAllNotificationInterview = () => {
    navigate("/dashboard/interviewnotification");
  };
  const showAllNotificationJoining = () => {
    navigate("/dashboard/joiningnotification");
  };
  const interviewNotificationApiFunc = async () => {
    const data = await interviewNotificationApi();
    const notificationData = data.data;
    setInterviewNotificationForSlice(notificationData);
    const interviewNotificationLength = notificationData.length;
    setInterviewLen(interviewNotificationLength);
  };
  const joingingNotificationApiFunc = async () => {
    const data = await joiningNotification();
    const notificationData = data.data;
    setJoiningNotificationForSlice(data.data);
    const joiningNotificationAPiLength = notificationData.length;
    setJoiningLen(joiningNotificationAPiLength);
  };
  useEffect(() => {
    interviewNotificationApiFunc();
    joingingNotificationApiFunc();
  }, []);
  const totalNotification = joiningLen + interviewLen;
  return (
    <>
      <div className="user-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-6 col-12 ps-5">
              <Link to="/">
                <img src={logo} width="210" className="ms-2" />
              </Link>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-end">
              <div className="ml-auto d-flex justify-content-end align-items-center">
                <div className="rsetting-head bell">
                  <Dropdown className="user-logoutmenu  d-inline-block">
                    <Dropdown.Toggle>
                      <div className="position-relative">
                        <i class="fa-regular fa-bell"></i>
                        <span className="badge bg-danger notify-ico">
                          {totalNotification}
                        </span>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <h6 className="text-center font-weight-bold">
                        {value == 1 ? interviewLen : joiningLen} New
                        Notifications
                      </h6>
                      <div className="dropdown-divider mb-0"></div>
                      <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                              onChange={handleChange}
                              aria-label="lab API tabs example"
                            >
                              <Tab label="Interviews" value="1" />
                              <Tab label="New Joinings" value="2" />
                            </TabList>
                          </Box>
                          <TabPanel value="1" sx={{ padding: "0" }}>
                            <div className="pt-2">
                              <div className="py-2">
                                {slicedInterviewNotification.map(
                                  (items, index) => (
                                    <div className="d-flex align-items-start text-sm btn btn-light rounded text-left mb-2">
                                      <div className="dropposition">
                                        <i class="fa-solid fa-user-tie  "></i>
                                      </div>
                                      <div className="ps-3">
                                        <strong className="d-block text-left h6 mt-1 font-weight-bold">
                                          Interview Notification
                                        </strong>
                                        <p className="mb-0 font-weight-normal">
                                          {moment(
                                            items.dateOfSeduled
                                          ).calendar()}
                                        </p>
                                        <div className="text-secondary text-left">
                                          {`candidate's Interview Scheduled at ${moment(
                                            items.dateOfSeduled
                                          ).format("MMM D YYYY, h:mm a")}`}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>

                              <div className="dropdown-divider my-2"></div>

                              <Dropdown.Item
                                as="button"
                                className="btn bg-white w-100 py-2 mt-2 text-sm text-center text-primary dropdown-item font-weight-semibold "
                                onClick={() => showAllNotificationInterview()}
                              >
                                Show all notifications
                              </Dropdown.Item>
                            </div>
                          </TabPanel>
                          <TabPanel value="2" sx={{ padding: "0" }}>
                            <div className="pt-2">
                              <div className="py-2">
                                {slicedJoiningNotification.map(
                                  (items, index) => (
                                    <div className="d-flex align-items-start text-sm btn btn-light rounded text-left mb-2">
                                      <div className="dropposition">
                                        <i class="fa-solid fa-user-plus  "></i>
                                      </div>
                                      <div className="ps-3">
                                        <strong className="d-block text-left h6 mt-1 font-weight-bold">
                                          Joining Notification
                                        </strong>
                                        <p className="mb-0 font-weight-normal">
                                          {" "}
                                          {moment(items.dateOfJoining)
                                            .startOf("day")
                                            .fromNow()}
                                        </p>
                                        <div className="text-secondary text-left">
                                          {`New Joining on ${moment(
                                            items.dateOfJoining
                                          ).format("MMM D YYYY")}`}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              {/* <div className="d-flex align-items-start text-sm btn btn-light rounded text-left">
                                <div className="dropposition">
                                  <i class="fa-solid fa-circle-exclamation text-danger"></i>
                                </div>
                                <div className="ps-3">
                                  <strong className="d-block text-left">
                                    Update Failed • 2h ago
                                  </strong>
                                  <div className="text-secondary text-left">
                                    Restart server 12 to complete the update.
                                  </div>
                                </div>
                              </div> */}

                              <div className="dropdown-divider my-2"></div>

                              {/* <div className="d-flex align-items-start text-sm btn btn-light rounded text-left">
                                <div className="dropposition">
                                  <i class="fa-solid fa-user-plus  "></i>
                                </div>
                                <div className="ps-3">
                                  <strong className="d-block text-left">
                                    Update Sucesss • 1h ago
                                  </strong>
                                  <div className="text-secondary text-left">
                                    Restart server 12 to complete the update.
                                  </div>
                                </div>
                              </div>
                              <div className="dropdown-divider my-2"></div> */}

                              <Dropdown.Item
                                as="button"
                                className="btn bg-white w-100 py-2 mt-2 text-sm text-center text-primary dropdown-item font-weight-semibold "
                                onClick={() => showAllNotificationJoining()}
                              >
                                Show all notifications
                              </Dropdown.Item>
                            </div>
                          </TabPanel>
                        </TabContext>
                      </Box>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className="rsetting-head">
                  <Dropdown className="user-logoutmenu">
                    <Dropdown.Toggle>
                      <img src={user} className="user-logoutmenu-img" />
                      <span className="user-logoutmenu-login"></span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="d-flex align-items-center py-1">
                        <div className="dropposition">
                          <img src={user} className="user-logoutmenu-img" />
                          <span className="user-logoutmenu-login"></span>
                        </div>
                        <div className="ps-3">
                          <strong className="d-block">{userName}</strong>
                          <div className="text-sm  text-primary  font-weight-semibold ">
                            {userEmail}
                          </div>
                        </div>
                      </div>

                      <div className="dropdown-divider"></div>
                      <button
                        className="btn btn-light btn-sm w-100 font-weight-semibold sign-outbtn"
                        onClick={() => logout()}
                      >
                        <i
                          className="fa fa-sign-out me-2"
                          aria-hidden="true"
                        ></i>
                        Sign Out
                      </button>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-header-empty"></div>
    </>
  );
};
export default TopBar;
