import axios from "axios";
import { apiurl, authCode } from "../Host";
export const interviewNotificationApi = async () => {
  const options = {
    method: "GET",
    url: `${apiurl}interviewNotifications`,
    params: { authCode: authCode },
  };
  const data = await axios.request(options);
  return data;
};

export const joiningNotification = async () => {
  const options = {
    method: "GET",
    url: `${apiurl}joiningNotifications`,
    params: { authCode: authCode },
  };
  const data = await axios.request(options);
  return data;
};
