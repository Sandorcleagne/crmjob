import React, { useState } from "react";
import Form_Select from "../../../Custom-Components/Form_Select";

const InterviewRoundFrom = ({ interViewForm }) => {
  const [candidateStatus, setCandidateStatus] = useState("");
  const [candidateInfo, setCandidateInfo] = useState({
    condidateProfile: "",
    interviewRound: "",
    siteId: "1",
    condidateEmail: "",
    interviewerName: "",
  });
  const GetValue = (e) => {
    setCandidateInfo({ ...candidateInfo, [e.target.name]: e.target.value });
  };
  const candidateStatusData = [
    { name: "Pass" },
    { name: "Fail" },
    { name: "Hold" },
  ];
  const getCandidateStatus = (e) => {
    const { value } = e.target;
    setCandidateStatus(value);
  };
  const submitCandidateInfo = () => {};
  return (
    <div
      style={
        interViewForm === true ? { display: "block" } : { display: "none" }
      }
    >
      <div className="form-box clearfix">
        <div className="container form-content">
          <h1 className="form-head">
            <i className="fa-solid  fa-user-tie fa-1x me-2"></i>
            {/* <i className="fa-solid fa-calendar-lines-pen fa-1x"></i> */}
            &nbsp;First Round
          </h1>
          <form onSubmit={submitCandidateInfo}> </form>
          <Form_Select
            label="Select Status"
            name="status"
            dropdown={candidateStatusData}
            id="siteId"
            value={candidateStatusData.Round}
            onChange={(e) => getCandidateStatus(e)}
          />
          <button onClick={""}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoundFrom;
