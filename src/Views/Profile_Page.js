import React, { useEffect, useMemo, useState, Suspense } from "react";
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import { useLocation } from "react-router";
// import ViewProfile from "../Atom/Form/ViewProfile";
import FirstRoundInterViewFrom from "../Atom/Form/FirstRoundInterViewFrom";
import HRFeedbackModal from "../Atom/Form/Modals/HRFeedbackModal";
import InterviewRoundFrom from "../Atom/Form/Modals/InterviewRoundFrom";
import Data_Table from "../Custom-Components/Data_Table";
import { getScheduleById } from "../API/ScheduledCandidateApi";
import ShowFeedbackModal from "../Atom/Form/Modals/ShowFeedbackModal";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import swal from "sweetalert";
import moment from "moment";
import CandidateInfoSekeleton from "../Skeleton/CandidateInfoSekeleton";
const ViewProfile = React.lazy(() => import("../Atom/Form/ViewProfile"));

const Profile_Page = () => {
  const [modalShow, setModalShow] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [scheduleBtnClicked, setscheduleBtnClicked] = useState(false);
  const [interViewForm, setInterviewForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({});
  const [candidateFeedbackInfo, setCandidateFeedbackInfo] = useState({});
  const [refreshPage, setRefreshPage] = useState(false);
  const [objectId, setObjectId] = useState("");
  const [check, setCheck] = useState([]);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const candidateData = state.row;
  const { id, candidateSeduleds } = candidateData;
  const lastdata =
    scheduleData.data === undefined
      ? {}
      : scheduleData.data.candidateSeduledList[
          scheduleData.data.candidateSeduledList.length - 1
        ];
  console.log("scheduleData", scheduleData);
  const { status, hrFeedback } = lastdata;
  const scheduleInterviewRound = (status, hrFeedback) => {
    if (status === null && hrFeedback === null) {
      swal("Please update status and feedback of last round", "error");
    } else {
      setscheduleBtnClicked(!scheduleBtnClicked);
    }
  };
  const handelCloseModal = () => {
    setModalShow(false);
    setFeedbackModal(false);
  };
  const openModal = (row) => {
    const { _id } = row;
    setObjectId(_id);
    setModalShow(true);
  };
  const openFeedbackModal = (row) => {
    setFeedbackModal(true);
    setCandidateFeedbackInfo(row);
  };
  const SelectItem = (e) => {
    if (e) {
      setCheck(e.selectedRows);
      // check.push(item);
    } else {
      // check.pop(item);
    }
  };
  const columns = [
    {
      name: "Interview Round",
      selector: "round",
      sortable: true,
      cell: (row) => (
        <a className="lead-email" onClick={() => openFeedbackModal(row)}>
          <b>{row.round}</b>
        </a>
      ),
    },
    {
      name: "Interviewer Name",
      selector: "interviewerName",
      sortable: true,
      cell: (row) => (
        <span className="lead-email">
          <b>{row.interviewerName}</b>
        </span>
      ),
    },
    {
      name: "Date",
      selector: "dateOfSeduled",
      sortable: true,
      cell: (row) => (
        <span className="lead-email">
          <b>{moment(row.dateOfSeduled).format("MMM Do YY, h:mm a")}</b>
        </span>
      ),
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <span className="lead-email">
          <b>{row.status}</b>
        </span>
      ),
    },
    {
      name: "Feedback",
      selector: "hrFeedback",
      sortable: true,
      cell: (row) => (
        <span className="lead-email">
          <b>
            {row.hrFeedback === null
              ? ""
              : row.hrFeedback.length > 10
              ? `${row.hrFeedback.slice(0, 10)}...`
              : row.hrFeedback.length}
          </b>
        </span>
      ),
    },
    // {
    //   name: "Hr-Executive",
    //   selector: "agentName",
    //   sortable: true,
    //   style: {
    //     color: "red",
    //     "font-weight": "bold",
    //   },
    // },
    {
      name: "Action",
      sortable: true,
      cell: (row) => (
        <div>
          <button
            type="button"
            className="btn btn-warning mw-auto"
            onClick={() => openModal(row)}
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      ),
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.status === "Pass",
      style: {
        backgroundColor: "#55cf65",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "Fail",
      style: {
        backgroundColor: "#F36870",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "Hold",
      style: {
        backgroundColor: "#FFFF5C",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  useEffect(() => {
    getScheduleById(candidateData, setScheduleData, dispatch);
  }, [refreshPage]);
  return (
    <div className="w-100">
      <Suspense fallback={<CandidateInfoSekeleton />}>
        <ViewProfile candidateData={candidateData} />
      </Suspense>

      <div className="schdule-int">
        <div className="container-1440 clearfix">
          <AccessTimeSharpIcon
            className="align-middle"
            style={{
              marginTop: "15px",
              fontSize: "28px",
              color: "rgb(177 177 177)",
            }}
          />
          <Button
            variant="contained"
            className="mt-3"
            type={"submit"}
            disableElevation
            onClick={() => scheduleInterviewRound()}
            style={{
              fontWeight: "700",
              fontFamily: '"Quicksand", sans-serif',
              fontSize: "14px",
              marginLeft: "15px",
            }}
            size="large"
            endIcon={<ArrowDropDownIcon />}
          >
            Schedule Interview
          </Button>
        </div>
        <FirstRoundInterViewFrom
          id={id}
          scheduleBtnClicked={scheduleBtnClicked}
          setscheduleBtnClicked={setscheduleBtnClicked}
          setInterviewForm={setInterviewForm}
          candidateData={candidateData}
          candidateScheduleList={
            Object.keys(scheduleData).length === 0
              ? []
              : scheduleData.data.candidateSeduledList
          }
          setRefreshPage={setRefreshPage}
          refreshPage={refreshPage}
          status={status}
          hrFeedback={hrFeedback}
        />
      </div>

      <InterviewRoundFrom interViewForm={interViewForm} />
      {Object.keys(scheduleData).length === 0 ? (
        <div className="text-center py-5 font-weight-medium">
          Interview Not Scheduled Yet
        </div>
      ) : (
        <Data_Table
          columns={columns}
          data={
            scheduleData.data.candidateSeduledList === null
              ? []
              : scheduleData.data.candidateSeduledList
          }
          SelectItem={SelectItem}
          conditionalRowStyles={conditionalRowStyles}
        />
      )}
      <HRFeedbackModal
        modalShow={modalShow}
        show={modalShow}
        onHide={handelCloseModal}
        title="HR Feedback For Candidate"
        setModalShow={handelCloseModal}
        objectId={objectId}
        setRefreshPage={setRefreshPage}
        refreshPage={refreshPage}
        id={id}
      />
      <ShowFeedbackModal
        modalShow={feedbackModal}
        onHide={handelCloseModal}
        title="Feedback Info"
        candidateFeedbackInfo={candidateFeedbackInfo}
      />
    </div>
  );
};

export default Profile_Page;
