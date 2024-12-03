import React from "react";
import swal from "sweetalert";
import { apiurl, authCode } from "../Host";

export const Leads_API = async (lead) => {
  var myHeaders = new Headers();
  console.log("lead.inActive", lead.inActive);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    contact: lead.contact,
    profilw: lead.Profile,
    email: lead.email,
    name: lead.name,
    managerId: lead.managerId,
    rollId: lead.rollId,
    userId: lead.userId,
    userName: lead.userName,
    subprofile: lead.subprofile,
    compani: lead.company,
    jobTitle: lead.jobTitle,
    preferredLocations: lead.preferredLocations,
    totalExp: lead.totalExp,
    currentCompaniName: lead.currentCompanyName,
    currentCompaniDesignation: lead.currentCompaniDesignation,
    department: lead.department,
    role: lead.role,
    industry: lead.industry,
    inActive: lead.inActive,
    anualSallery: lead.anualSalary,
    underGraduateDegree: lead.underGraduateDegree,
    upSpecelization: lead.upSpecelization,
  });
  console.log("raw", raw);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiurl + "addjobs?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.statusCode == 200) {
        swal("Good job!", result.message, "success");
      } else {
        swal("Alert!", result.message, "error");
      }
    })
    .catch((error) => console.log("error"));
};

export const getLeadStatusHistory = ({ lead, setStatusHistory, userData }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    apiurl + "/getLeadStatusHistroy/" + lead + "?authCode=" + authCode,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setStatusHistory(result);
    })
    .catch((error) => console.log("error"));
};

export const getLeadNotes = (leadId) => {};

export const updateLeadNote = (leadNote, userData, row) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    leadId: leadNote.leadId == null ? row.id : leadNote.leadId,
    notes: leadNote.notes,
    userId: userData.userId,
    userName: userData.userName,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(apiurl + "/addLeadNotesHistory?authCode=" + authCode, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log("result"))
    .catch((error) => console.log("error"));
};
