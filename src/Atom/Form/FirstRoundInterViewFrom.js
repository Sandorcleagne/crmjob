import React, { useEffect, useState, useMemo } from "react";
import swal from "sweetalert";
import { getAllLeadsData } from "../../API/getAllLeadsData";
import {
  getScheduleById,
  scheduledCandidateApi,
} from "../../API/ScheduledCandidateApi";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { scheduledCandidateInfo } from "../../utils/ScheduledCandidateUtils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HRFeedbackModal from "./Modals/HRFeedbackModal";
import { TextField } from "@mui/material";
const FirstRoundInterViewFrom = ({
  scheduleBtnClicked,
  candidateData,
  candidateScheduleList,
  refreshPage,
  setRefreshPage,
  status,
  hrFeedback,
}) => {
  const [candidateInfo, setCandidateInfo] = useState({
    condidateProfile: "",
    interviewRound: "",
    siteId: "1",
    condidateEmail: "",
    interviewerName: "",
  });
  const [value, setValue] = React.useState(Date.now());
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const candidateInterviewRound =
    candidateScheduleList === undefined || candidateScheduleList.length === 0
      ? []
      : candidateScheduleList;
  const cdDaata = candidateScheduleList.map((items, index) => {
    return `Round ${candidateScheduleList.length + 1}`;
  });
  const [modalShow, setModalShow] = useState(false);
  const [userLeadData, setUserLeadData] = useState([]);
  const GetValue = (e) => {
    setCandidateInfo({ ...candidateInfo, [e.target.name]: e.target.value });
  };
  const submitCandidateInfo = async (e) => {
    if (candidateInfo.interviewerName === "") {
      e.preventDefault();
      swal("Please Fill Interviewer Name!", { icon: "error" });
    } else {
      e.preventDefault();
      const data = await scheduledCandidateApi(
        candidateInfo,
        candidateData,
        cdDaata,
        value
      );
      setRefreshPage(!refreshPage);
      swal("Interview Scheduled Successfully!", "success");
      setCandidateInfo({
        candidateName: "",
        condidateProfile: "",
        interviewRound: "",
        status: "",
        siteId: "1",
        condidateEmail: "",
        interviewerName: "",
        dateAndTimeOfInterview: "",
      });
    }
  };
  const handelCloseModal = useMemo(() => {
    setModalShow(false);
  }, [modalShow]);
  const getAllLeadsDataFunc = async () => {
    const leadsData = await getAllLeadsData();
    setUserLeadData(leadsData.data);
  };
  useEffect(() => {
    getAllLeadsDataFunc();
  }, []);
  return (
    <div
      style={
        scheduleBtnClicked === true ? { display: "block" } : { display: "none" }
      }
    >
      <div className="form-box">
        <div className="container form-content">
          <h1 className="form-head">
            <i class="fa-solid  fa-user-tie fa-2x"></i>
            &nbsp;Schedule Interview
          </h1>
          <form onSubmit={submitCandidateInfo}>
            <div className="row text-dark">
              {scheduledCandidateInfo(
                candidateInfo,
                candidateInterviewRound,
                cdDaata
              ).map((candidateForm) => (
                <Form_Input
                  key={candidateForm.id}
                  label={candidateForm.label}
                  name={candidateForm.name}
                  id={candidateForm.id}
                  value={candidateForm.value}
                  placeholder={candidateForm.placeholder}
                  type={candidateForm.type}
                  required={candidateForm.required}
                  onChange={(e) => GetValue(e)}
                />
              ))}

              <div className="col-12 col-md-6 col-xxl-4 mb-btmsp form-group">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Interview Date and Time"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          "& .MuiInputBase-input": {
                            height: "40px", // Set your height here.
                          },
                        }}
                        inputProps={{ readOnly: true }}
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-12">
                <hr class="bsub-topline"></hr>
              </div>
              <Form_Button />
            </div>
          </form>
        </div>
      </div>
      <HRFeedbackModal
        modalShow={modalShow}
        show={modalShow}
        onHide={handelCloseModal}
        title="HR Feedback For Candidate"
        setModalShow={setModalShow}
      />
    </div>
  );
};

export default FirstRoundInterViewFrom;
