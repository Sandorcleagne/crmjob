import React, { useEffect, useState } from "react";
import { Country_API } from "../../API/Country_API";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import Form_Grup_Input from "../../API/Checkl_Country";

const AddCountryForm = () => {
  const [countryValues, setCountryValues] = useState({
    countryName: "",
    metaDescription: "",
    metaTittle: "",
    metaKeywords: "",
    site: "",
    countryStatus: "",
  });
  const [getter, setter] = useState("Check Availability");
  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];
  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];
  const SubmitCountry = (e) => {
    e.preventDefault();
    Country_API(countryValues);
  };

  const GetValue = (e) => {
    setCountryValues({ ...countryValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-flag-usa"></i>&nbsp;Add Country
        </h1>
        <form onSubmit={SubmitCountry}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="site"
              dropdown={sites}
              id="sites"
              value={countryValues.site}
              onChange={(e) => GetValue(e)}
            />

            <Form_Grup_Input
              label="Country Name"
              name="countryName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="countryName"
              value={countryValues.countryName}
              onChange={(e) => GetValue(e)}
              getter={getter}
              setter={setter}
              siteId={countryValues.site}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="countryStatus"
              value={countryValues.countryStatus}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={countryValues.metaDescription}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTittle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTittle"
              value={countryValues.metaTittle}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={countryValues.metaKeywords}
              onChange={(e) => GetValue(e)}
            />
            {/* <Form_Input
              type="file"
              label="Country Image"
              name="countryName"
              div_className="col-12 col-md-6 col-xxl-4"
              accept="image/*"
            /> */}
            <Form_Button getter={getter} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCountryForm;
