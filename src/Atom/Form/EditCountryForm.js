import React, { useEffect, useState } from "react";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import Form_Grup_Input from "../../API/Checkl_Country";
import { UpdateCountry } from "../../API/Country_API";
import { async } from "rxjs/internal/scheduler/async";
import { apiurl, authCode } from "../../Host";
import { useParams } from "react-router";

// const productId = useParams();
// console.log("productId",productId);
const EditCountryForm = ({ productId }) => {
  const [editCountryValues, setEditCountryValues] = useState({});

  const getCountry = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getCountryById/" +
        productId.productId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditCountryValues(result);
      })
      .catch((error) => console.log("error", error));
  };

  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];
  const [getter, setter] = useState("Check Availability");

  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];

  const SubmitCountry = (e) => {
    e.preventDefault();
    UpdateCountry(editCountryValues);
  };

  const GetValue = (e, name) => {
    setEditCountryValues({ ...editCountryValues, [name]: e.target.value });
  };

  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">Edit Country</h1>
        <form onSubmit={SubmitCountry}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="site"
              dropdown={sites}
              id="sites"
              value={editCountryValues.siteId}
              onChange={(e) => GetValue(e, "siteId")}
              onClick={() => getCountry()}
            />

            <Form_Grup_Input
              label="Country Name"
              name="countryName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="countryName"
              value={editCountryValues.name}
              onChange={(e) => GetValue(e, "name")}
              getter={getter}
              setter={setter}
              siteId={editCountryValues.siteId}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="countryStatus"
              value={editCountryValues.status}
              onChange={(e) => GetValue(e, "status")}
            />
            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={editCountryValues.metaDescription}
              onChange={(e) => GetValue(e, "metaDescription")}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTittle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTittle"
              value={editCountryValues.metaTitle}
              onChange={(e) => GetValue(e, "metaTitle")}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={editCountryValues.metaKeywords}
              onChange={(e) => GetValue(e, "metaKeywords")}
            />

            <Form_Button_Edit getter={getter} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditCountryForm;
