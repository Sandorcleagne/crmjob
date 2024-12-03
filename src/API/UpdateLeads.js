import axios from "axios";
import { apiurl, authCode } from "../Host";
import moment from "moment";
export const updateLeadsApi = async (
  candidateInfo,
  candidateId,
  candidateStatus
) => {
  const {
    interviewerName,
    condidateProfile,
    dateAndTimeOfInterview,
  } = candidateInfo;
  const options = {
    method: "POST",
    url: `${apiurl}updateLeads/${candidateId}`,
    params: { authCode: authCode },
    headers: { "Content-Type": "application/json" },
    data: {
      interviwerName: interviewerName,
      candidateProfile: condidateProfile,
      passFirst: candidateStatus,

      //   dateAndTimeOfInterview: moment(dateAndTimeOfInterview).format(
      //     "MMMM Do YYYY, h:mm:ss a"
      //   ),
    },
  };
  const data = await axios.request(options);
  return data;
};
