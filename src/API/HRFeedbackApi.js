import axios from "axios";
import { apiurl, authCode } from "../Host";
export const HRFeedbackApi = async (HRfeedbackData, objectId, value) => {
  console.log("HRfeedbackData", HRfeedbackData);
  const { feedback, status, annualSalary, dateofJoining } = HRfeedbackData;

  const options = {
    method: "POST",
    url: `${apiurl}updateHrFeedback/${objectId}`,
    params: { authCode: authCode },
    headers: { "Content-Type": "application/json" },
    data: {
      hrFeedback: feedback,
      status: status,
      annualSalleryy: annualSalary,
      dateOfJoining: value,
    },
  };
  const data = await axios.request(options);
  return data;
};
