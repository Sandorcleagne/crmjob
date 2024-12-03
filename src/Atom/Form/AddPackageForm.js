import { isHostComponent } from "@mui/base";
import React, { useEffect, useState } from "react";
import { from } from "rxjs";
import { Package_API } from "../../API/Package_API";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Grup_Input from "../../API/Check_Package";

function AddPackageForm() {
  const [packageValues, setCountryValues] = useState({
    packageName: "",
    metaDescription: "",
    metaTitle: "",
    metaKeywords: "",
    site: "",
    countryid: "",
    packageStatus: "",
  });

  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];
  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];
  // const countries = [
  //   { id: 1, name: "India", value: 1 },
  //   { id: 2, name: "USA", value: 2 },
  // ];

  const [countries, setCountries] = useState([]);
  const [getter, setter] = useState("Check Availability");

  const GetValue = (e) => {
    setCountryValues({ ...packageValues, [e.target.name]: e.target.value });
  };

  const getCountries = () => {
    console.log("apiCalled");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getCountriesBySiteIdCRM/${packageValues.site}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => console.log("error", error));
  };

  const SubmitCountry = (e) => {
    e.preventDefault();
    Package_API(packageValues);
  };

  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-suitcase"></i>&nbsp;Add Packages
        </h1>
        <form onSubmit={SubmitCountry}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="site"
              dropdown={sites}
              id="sites"
              value={packageValues.site}
              onChange={(e) => GetValue(e)}
              onClick={() => getCountries()}
            />
            <Form_Select
              label="Select Country"
              name="countryid"
              dropdown={countries}
              id="countryid"
              value={packageValues.countryid}
              onChange={(e) => GetValue(e)}
            />

            <Form_Grup_Input
              label="Package Name"
              name="packageName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="packageName"
              value={packageValues.packageName}
              onChange={(e) => GetValue(e)}
              getter={getter}
              setter={setter}
            />

            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={packageValues.metaDescription}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTitle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTitle"
              value={packageValues.metaTitle}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={packageValues.metaKeywords}
              onChange={(e) => GetValue(e)}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="packageStatus"
              value={packageValues.packageStatus}
              onChange={(e) => GetValue(e)}
            />
            {/* <Form_Input
              type="file"
              label="Package Image"
              name="packageImage"
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

export default AddPackageForm;
