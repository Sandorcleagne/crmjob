import React from "react";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Grup_Input from "../../API/Check_Location";
import Form_Select from "../../Custom-Components/Form_Select";
import Form_Button from "../../Custom-Components/Form_Button";
import State, { useEffect, useState } from "react";
import { apiurl, authCode } from "../../Host";
import { Location_API } from "../../API/Location_API";

function AddLocationForm() {
  const [locationValues, setLocationValues] = useState({
    locationName: "",
    metaDescription: "",
    metaTittle: "",
    metaKeywords: "",
    siteId: "",
    countryId: "",
    packageId: "",
    vaccationTypeId: "",
    status: "",
  });
  const [getter, setter] = useState("Check Availability");
  const [countries, setCountries] = useState([]);

  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];
  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];

  const GetValue = (e) => {
    setLocationValues({ ...locationValues, [e.target.name]: e.target.value });
  };

  const getCountries = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getCountriesBySiteIdCRM/${locationValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => console.log("error", error));
  };

  const [packages, setPackages] = useState([]);

  const getPackages = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getPackagesBySiteIdCRM/${locationValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPackages(result);
      })
      .catch((error) => console.log("error", error));
  };

  const [vaccationType, setvaccationType] = useState([]);

  const getVaccationType = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getVaccationsTypeBySiteIdCRM/${locationValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setvaccationType(result);
      })
      .catch((error) => console.log("error", error));
  };

  const SubmitCountry = (e) => {
    e.preventDefault();
    Location_API(locationValues);
  };

  const masterFunction = () => {
    getCountries();
    getPackages();
    getVaccationType();
  };

  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-map-location-dot"></i>&nbsp;Add
          Locations
        </h1>
        <form onSubmit={SubmitCountry}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="siteId"
              dropdown={sites}
              id="siteId"
              value={locationValues.siteId}
              onChange={(e) => GetValue(e)}
              onClick={() => masterFunction()}
            />
            <Form_Select
              label="Select Country"
              name="countryId"
              dropdown={countries}
              id="countryId"
              value={locationValues.countryId}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Select Package"
              name="packageId"
              dropdown={packages}
              id="packageId"
              value={locationValues.packageId}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Select Vaccation Type"
              name="vaccationTypeId"
              dropdown={vaccationType}
              id="vaccationTypeId"
              value={locationValues.vaccationTypeId}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="status"
              value={locationValues.status}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={locationValues.metaDescription}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTittle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTittle"
              value={locationValues.metaTittle}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={locationValues.metaKeywords}
              onChange={(e) => GetValue(e)}
            />

            <Form_Grup_Input
              label="Location Name"
              name="locationName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="locationName"
              value={locationValues.locationName}
              onChange={(e) => GetValue(e)}
              getter={getter}
              setter={setter}
              siteId={locationValues.siteId}
            />
            <Form_Button />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLocationForm;
