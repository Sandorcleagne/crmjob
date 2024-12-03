import React, { useEffect, useState } from "react";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Grup_Input from "../../API/Check_Vaccation_Type";
import { VaccationType_API } from "../../API/VaccationType_API";

const EditVaccationTypeForm = ({ productId }) => {
  const [editVaccationTypeValues, setEditVaccationTypeValues] = useState({});
  const [countries, setCountries] = useState([]);
  const [packages, setPackages] = useState([]);
  const [getter, setter] = useState("Check Availability");

  const status = [
    { id: 1, name: "Active", value: 1 },
    { id: 2, name: "Deactive", value: 2 },
  ];

  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];

  const getPackages = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getPackagesBySiteIdCRM/${editVaccationTypeValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPackages(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getCountries = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getCountriesBySiteIdCRM/${editVaccationTypeValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getVaccationsType = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getVaccationTypeById/" +
        productId.productId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditVaccationTypeValues(result);
      })
      .catch((error) => console.log("error", error));
  };

  const GetValue = (e, name) => {
    setEditVaccationTypeValues({
      ...editVaccationTypeValues,
      [name]: e.target.value,
    });
  };

  const SubmitVaccationType = (e) => {
    e.preventDefault();
    VaccationType_API(editVaccationTypeValues);
  };

  const masterFunction = () => {
    getVaccationsType();
    getCountries();
    getPackages();
  };
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-tree-city"></i>&nbsp;Edit Vaccations
          Type
        </h1>

        <form onSubmit={SubmitVaccationType}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="site"
              dropdown={sites}
              id="sites"
              value={editVaccationTypeValues.siteId}
              onChange={(e) => GetValue(e, "siteId")}
              onClick={() => masterFunction()}
            />
            <Form_Select
              label="Select Country"
              name="countryid"
              dropdown={countries}
              id="countryid"
              value={editVaccationTypeValues.countryId}
              onChange={(e) => GetValue(e, "countryId")}
            />
            <Form_Select
              label="Select Package"
              name="packageId"
              dropdown={packages}
              id="countryid"
              value={editVaccationTypeValues.packageId}
              onChange={(e) => GetValue(e, "packageId")}
            />

            <Form_Grup_Input
              label="Vaccation Type Name"
              name="vaccationTypeName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="vaccationType"
              value={editVaccationTypeValues.name}
              onChange={(e) => GetValue(e, "name")}
              getter={getter}
              setter={setter}
              siteId={editVaccationTypeValues.siteId}
            />
            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={editVaccationTypeValues.metaDescription}
              onChange={(e) => GetValue(e, "metaDescription")}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTittle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTittle"
              value={editVaccationTypeValues.metaTitle}
              onChange={(e) => GetValue(e, "metaTitle")}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={editVaccationTypeValues.metaKeywords}
              onChange={(e) => GetValue(e, "metaKeywords")}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="vaccationtypeStatus"
              value={editVaccationTypeValues.status}
              onChange={(e) => GetValue(e, "status")}
            />
            {/* <Form_Input
              type="file"
              label="Vaccation Type Image"
              name="vaccationTypeImage"
              div_className="col-12 col-md-6 col-xxl-4"
              accept="image/*"
            /> */}
            <Form_Button_Edit getter={getter} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVaccationTypeForm;
