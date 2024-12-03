import axios from "axios";
import { apiurl, authCode } from "../Host";
export const scheduledCandidateApi = async (
  candidateInfo,
  candidateData,
  cdDaata,
  value
) => {
  const { id } = candidateData;
  const { interviewerName, dateAndTimeOfInterview } = candidateInfo;
  console.log(cdDaata[0]);
  const options = {
    method: "POST",
    url: `${apiurl}addSchedule`,
    params: { authCode: authCode },
    headers: { "Content-Type": "application/json" },
    data: {
      round: cdDaata.length === 0 ? "Round 1" : cdDaata[0],
      candidateId: id,
      dateOfSeduled: value,
      interviewerName: interviewerName,
    },
  };
  const data = await axios.request(options);
  return data;
};
export const getScheduleById = async (candidateData, setScheduleData) => {
  const { id } = candidateData;
  const options = {
    method: "GET",
    url: `${apiurl}getScheduleById/${id}`,
    params: { authCode: authCode },
  };
  const data = await axios.request(options);

  setScheduleData(data.data.candidateSeduledList == null ? [] : data);
};
