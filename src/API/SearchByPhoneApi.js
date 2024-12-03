import axios from "axios";
import { apiurl, authCode } from "../Host";
export const searchByPhoneApi = async (phoneNumber) => {
  const options = {
    method: "GET",
    url: `${apiurl}getByPhoneNumber/${phoneNumber}`,
    params: { authCode: authCode },
  };
  const data = await axios.request(options);
  console.log(data);
  return data;
};
