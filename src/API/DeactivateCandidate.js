import axios from "axios";
import { apiurl, authCode } from "../Host";
export const deactivateCandidate = async (candidateId) => {
  const options = {
    method: "GET",
    url: `${apiurl}makeCandidateDeactive/${candidateId}`,
    params: {
      authCode: authCode,
    },
  };
  const data = await axios.request(options);
  return data;
};
export const activateCandidate = async (candidateId) => {
  const options = {
    method: "GET",
    url: `${apiurl}makeCandidateActive/${candidateId}`,
    params: {
      authCode: authCode,
    },
  };
  const data = axios.request(options);
  return data;
};
