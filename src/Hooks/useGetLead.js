import React, { useEffect, useState } from "react";
import { apiurl, authCode } from "../Host";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
const useGetLead = (pageRefresh, setLeadForFilter) => {
  const [leads, setLeads] = useState([]);
  // console.log("leads", leads);
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const roleId = cookies.login.roleId;
  const userID = cookies.login.userId;

  const dispatch = useDispatch();
  const getLeads = async () => {
    try {
      const options = {
        method: "GET",
        url: `${apiurl}getLeads/${roleId}/${userID}`,
        params: { authCode: authCode },
        headers: { cookie: "JSESSIONID=FD793F5A18092D23E2BDC7AC1BC21227" },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setLeads(response.data);
          console.log("leads", leads);

          // setLeadForFilter(response.data);
          dispatch({ type: "GETCANDIDATEINFO", payload: response.data });
        })
        .catch(function (error) {
          setLeads([]);
          console.error(error);
        });
    } catch (err) {
      setLeads([]);
      console.log("err", err);
    }
  };

  useEffect(() => {
    getLeads();
  }, [pageRefresh]);
  return leads;
};

export default useGetLead;
