import React, { useEffect, useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import swal from "sweetalert";
import { getAllLeadsData } from "../../API/getAllLeadsData";
import { scheduledCandidateApi } from "../../API/ScheduledCandidateApi";
import { updateLeadsApi } from "../../API/UpdateLeads";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { scheduledCandidateInfo } from "../../utils/ScheduledCandidateUtils";
import FirstRoundInterViewFrom from "./FirstRoundInterViewFrom";
// import HRFeedbackModal from "./Modals/HRFeedbackModal";
// import SecondRoundInterviewFrom from "./SecondRoundInterviewFrom";
const ScheduledCandidateForm = () => {
  const [candidateInfo, setCandidateInfo] = useState({
    condidateProfile: "",
    interviewRound: "",
    siteId: "1",
    condidateEmail: "",
    interviewerName: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [userLeadData, setUserLeadData] = useState([]);
  const [candidateId, setCandidateId] = useState("");
  const [candidateStatus, setCandidateStatus] = useState("");
  const GetValue = (e) => {
    setCandidateInfo({ ...candidateInfo, [e.target.name]: e.target.value });
  };
  const candidateStatusData = [
    { name: "Pass" },
    { name: "Fail" },
    { name: "Hold" },
  ];
  const submitCandidateInfo = async (e) => {
    e.preventDefault();
    const data = await updateLeadsApi(
      candidateInfo,
      candidateId,
      candidateStatus
    );
    console.log("data", data);
    setModalShow(true);
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
  };
  const handelCloseModal = useMemo(() => {
    setModalShow(false);
  }, [modalShow]);
  const getAllLeadsDataFunc = async () => {
    const leadsData = await getAllLeadsData();
    setUserLeadData(leadsData.data);
  };
  const getCandidateName = (e) => {
    const { value } = e.target;
    setCandidateId(value);
  };
  const getCandidateStatus = (e) => {
    const { value } = e.target;
    setCandidateStatus(value);
  };
  useEffect(() => {
    getAllLeadsDataFunc();
  }, []);
  return (
    <>
      <FirstRoundInterViewFrom />
      {/* <SecondRoundInterviewFrom /> */}
    </>
  );
};

export default ScheduledCandidateForm;
