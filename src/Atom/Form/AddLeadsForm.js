import React from "react";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import { apiurl, authCode } from "../../Host";
import State, { useEffect, useState } from "react";
import { Leads_API } from "../../API/Lead_API";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { addLeadsFormUtils } from "../../utils/addLeadFormUtils";
import { useCookies } from "react-cookie";

const AddLeadsForm = () => {
  const auth = useSelector((state) => state.auth);
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const { userName, roleId, siteId, userEmail, userId, managerId } =
    cookies.login;
  console.log("userName", userName);
  const [leads, setLeadsValue] = useState({
    contact: "",
    Profile: "",
    email: "",
    name: "",
    userName: userName,
    subprofile: "",
    company: "",
    jobTitle: "",
    preferredLocations: "",
    totalExp: "",
    currentCompanyName: "",
    currentCompaniDesignation: "",
    department: "",
    role: "",
    industry: "",
    anualSalary: "",
    inActive: "1",
    underGraduateDegree: "",
    upSpecelization: "",
    managerId: managerId,
    rollId: roleId,
    userId: userId,
  });

  const SubmitLeads = (e) => {
    if (leads.name !== "") {
      e.preventDefault();
      console.log("leads", leads);
      Leads_API(leads);
      setLeadsValue({
        contact: "",
        Profile: "",
        email: "",
        name: "",
        userName: userName,
        subprofile: "",
        company: "",
        jobTitle: "",
        preferredLocations: "",
        totalExp: "",
        currentCompanyName: "",
        currentCompaniDesignation: "",
        department: "",
        role: "",
        industry: "",
        anualSalary: "",
        inActive: "1",
        underGraduateDegree: "",
        upSpecelization: "",
        managerId: managerId,
        rollId: roleId,
        userId: userId,
      });
    } else {
      e.preventDefault();
      swal("Candidate name is required to process furthure", { icon: "error" });
    }
  };

  const GetValue = (e) => {
    setLeadsValue({ ...leads, [e.target.name]: e.target.value });
  };

  const GetCsvJson = (e) => {
    console.log("e", e.target.files[0]);
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Once Uploaded, New leads will be saved and existing will be Updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var formdata = new FormData();
        formdata.append("userName", userName);
        formdata.append("file", e.target.files[0]);
        formdata.append("authCode", authCode);
        formdata.append("userId", userId);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        console.log("formdata", formdata);
        fetch(apiurl + "/uploadLeads", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("result:", result);
            if (result.statusCode === 200) {
              swal(result.message, {
                icon: "success",
              });
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        swal("Your request is cancelled", {
          icon: "error",
        });
      }
    });
  };
  return (
    <div className="pb-5">
      <div className="form-box clearfix">
        <div className="container form-content">
          <h1 className="form-head">
            <i className="fa-solid  fa-user-tie fa-1x me-2"></i>
            &nbsp;Add Candidates
          </h1>
          <form onSubmit={SubmitLeads}>
            <div className="row">
              {addLeadsFormUtils(leads).map((leadFormData) => (
                <Form_Input
                  key={leadFormData._id}
                  label={leadFormData.label}
                  name={leadFormData.name}
                  div_className={leadFormData.div_class}
                  id={leadFormData.id}
                  value={leadFormData.value}
                  type={leadFormData.type}
                  maxLength={leadFormData.maxLength}
                  onChange={(e) => GetValue(e)}
                />
              ))}

              <div className="col-12">
                <hr class="bsub-topline"></hr>
              </div>
              <Form_Button div_className="d-flex justify-content-center align-items-center mt-3" />
            </div>
          </form>
        </div>
      </div>

      <div className="form-box clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-xxl-4">
              <div>
                <label for="leadsUpload" className="flaot-labelbm">
                  Upload File
                </label>
                <input
                  className="form-control"
                  id="leadsUpload"
                  type="file"
                  accept=".csv"
                  onChange={(e) => GetCsvJson(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeadsForm;
