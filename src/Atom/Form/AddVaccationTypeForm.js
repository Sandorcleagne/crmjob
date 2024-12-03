import React from "react";
import Form_Select from "../../Custom-Components/Form_Select";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import State, { useEffect, useState } from "react";
import { apiurl, authCode } from "../../Host";
import Form_Grup_Input from "../../API/Check_Vaccation_Type";
import { Add_VaccationType } from "../../API/VaccationType_API";

function AddVaccationTypeForm() {
  const [vaccationTypeValues, setVaccationTypeValues] = useState({
    vaccationTypeName: "",
    metaDescription: "",
    metaTittle: "",
    metaKeywords: "",
    site: "",
    countryid: "",
    packageId: "",
    vaccationTypeStatus: "",
  });

  const status = [
    { id: 1, name: "Active", value: 1 },
    { id: 2, name: "Deactive", value: 2 },
  ];
  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];
  const [countries, setCountries] = useState([]);

  const getCountries = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getCountriesBySiteIdCRM/${vaccationTypeValues.site}?authCode=` +
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
  const [getter, setter] = useState("Check Availability");

  const getPackages = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getPackagesBySiteIdCRM/${vaccationTypeValues.site}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPackages(result);
      })
      .catch((error) => console.log("error", error));
  };

  console.log(packages);

  const SubmitVaccationType = (e) => {
    e.preventDefault();
    Add_VaccationType(vaccationTypeValues);
  };

  const GetValue = (e) => {
    setVaccationTypeValues({
      ...vaccationTypeValues,
      [e.target.name]: e.target.value,
    });
  };
  // useEffect(() => {
  //   getCountries();
  //   getPackages();
  // }, []);
  const masterFunction = () => {
    getCountries();
    getPackages();
  };
  console.log(vaccationTypeValues);
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-tree-city"></i>&nbsp;Add Vaccations
          Type
        </h1>

        <form onSubmit={SubmitVaccationType}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="site"
              dropdown={sites}
              id="sites"
              value={vaccationTypeValues.site}
              onChange={(e) => GetValue(e)}
              onClick={() => masterFunction()}
            />
            <Form_Select
              label="Select Country"
              name="countryid"
              dropdown={countries}
              id="countryid"
              value={vaccationTypeValues.countryid}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Select Package"
              name="packageId"
              dropdown={packages}
              id="countryid"
              value={vaccationTypeValues.packageId}
              onChange={(e) => GetValue(e)}
            />

            <Form_Grup_Input
              label="Vaccation Type Name"
              name="vaccationTypeName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="vaccationType"
              value={vaccationTypeValues.vaccationTypeName}
              onChange={(e) => GetValue(e)}
              getter={getter}
              setter={setter}
              siteId={vaccationTypeValues.site}
            />
            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={vaccationTypeValues.metaDescription}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTittle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTittle"
              value={vaccationTypeValues.metaTittle}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={vaccationTypeValues.metaKeywords}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="vaccationTypeStatus"
              value={vaccationTypeValues.vaccationTypeStatus}
              onChange={(e) => GetValue(e)}
            />
            {/* <Form_Input
              type="file"
              label="Vaccation Type Image"
              name="vaccationTypeImage"
              div_className="col-12 col-md-6 col-xxl-4"
              accept="image/*"
            /> */}
            <Form_Button getter={getter} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVaccationTypeForm;
