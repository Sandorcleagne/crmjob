import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { apiurl, authCode } from "../../Host";
import Form_Input from "../../Custom-Components/Form_Input";
import { useNavigate } from "react-router";
import { rupeeSymbol } from "../../utils/symbol";

const ViewProfile = ({ candidateData }) => {
  const {
    name,
    email,
    contact,
    department,
    currentCompaniName,
    currentCompaniDesignation,
    totalExp,
    underGraduateDegree,
    upSpecelization,
    anualSallery,
    preferredLocations,
  } = candidateData;
  console.log("candidateData", candidateData);
  return (
    <>
      <div className="form-box clearfix">
        <div className="container form-content">
          <h2 className="form-head">
            <i className="fa-solid page-icon fa-user"></i>&nbsp;Candidate
            Details
          </h2>
          <div className="row align-items-end tbal-us desk-label-sub">
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Name: </strong>
              </p>
              <p className="m-0">{name}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Current Company: </strong>
              </p>
              <p className="m-0">{currentCompaniName}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Experience: </strong>
              </p>
              <p className="m-0">{totalExp}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Email: </strong>
              </p>
              <p className="m-0">{email}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Current Company Designation: </strong>
              </p>
              <p className="m-0">{currentCompaniDesignation}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>UG Degree: </strong>
              </p>
              <p className="m-0">{underGraduateDegree}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Prefferd Location: </strong>
              </p>
              <p className="m-0">{preferredLocations}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Phone: </strong>
              </p>
              <p className="m-0">{contact}</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Expected Salary: </strong>
              </p>
              <p className="m-0">
                {rupeeSymbol}
                {anualSallery}
              </p>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  border-bottom py-3">
              <p className="d-block mb-1 desk-label">
                <strong>Specialisation: </strong>
              </p>
              <p className="m-0">{upSpecelization}</p>
            </div>
            {/* <div className="col-12 col-md-6 col-xxl-4  pt-3">
              <p className="d-block mb-1 desk-label">
                <strong>Interviewer 3rd Round: </strong>
              </p>
              <p className="m-0">{interviwerNameFinal}</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
