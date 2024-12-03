import axios from "axios";
import { apiurl, authCode } from "../Host";
export const getAllLeadsData = async () => {
  const options = {
    method: "GET",
    url: `${apiurl}getLeadDetails`,
    params: { authCode: authCode },
  };

  const data = await axios.request(options);
  return data;
};
export const getAllLeadsByUserId = async (userID, roleId) => {
  const options = {
    method: "GET",
    url: `${apiurl}getLeads/${roleId}/${userID}`,
    params: { authCode: authCode },
    headers: { cookie: "JSESSIONID=FD793F5A18092D23E2BDC7AC1BC21227" },
  };

  const data = await axios.request(options);
  return data;
};
