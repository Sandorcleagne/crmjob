import axios from "axios";
import swal from "sweetalert";
import { apiurl, authCode } from "../Host";
export const loginApi = async (setCookie) => {
  const options = {
    method: "POST",
    url: `${apiurl}userLogin`,
    params: { authCode: authCode },
    // headers: {
    //   cookie: "JSESSIONID=DA904369C82E5ED32687CD3396167D57",
    //   "Content-Type": "application/json",
    // },
    data: {
      siteId: 1,
      userEmail: "bikesh.sharma@gmail.com",
      userPassword: "123456",
    },
  };

  const data = await axios.request(options);
  if (data.data.status) {
    // setCookie("login", JSON.stringify(data));
  } else {
    swal("Unable to Login Please Try Again");
  }
  return data;
};
