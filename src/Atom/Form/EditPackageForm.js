import React, { useEffect, useState } from "react";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Grup_Input from "../../API/Check_Package";
import { UpdatePackage } from "../../API/Package_API";

const EditPackageForm = ({ productId }) => {
  const [editPackageValues, setEditPackageValues] = useState({});
  const [countries, setCountries] = useState([]);
  const [getter, setter] = useState("Check Availability");

  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];

  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];

  const getCountries = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getCountriesBySiteIdCRM/${editPackageValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getPackages = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getPackageById/" +
        productId.productId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEditPackageValues(result);
      })
      .catch((error) => console.log("error", error));
  };

  const GetValue = (e, name) => {
    setEditPackageValues({ ...editPackageValues, [name]: e.target.value });
  };

  const SubmitPackage = (e) => {
    e.preventDefault();
    UpdatePackage(editPackageValues);
  };
  // console.log("editPackageValues:", editPackageValues);

  const masterFunction = () => {
    getPackages();
    getCountries();
  };

  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">Edit Package</h1>
        <form onSubmit={SubmitPackage}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="site"
              dropdown={sites}
              id="sites"
              value={editPackageValues.siteId}
              onChange={(e) => GetValue(e, "siteId")}
              onClick={() => masterFunction()}
            />
            <Form_Select
              label="Select Country"
              name="countryid"
              dropdown={countries}
              id="countryid"
              value={editPackageValues.countryId}
              onChange={(e) => GetValue(e, "countryId")}
            />
            <Form_Grup_Input
              label="Package Name"
              name="packageName"
              div_className="col-12 col-md-6 col-xxl-4"
              id="packageName"
              value={editPackageValues.name}
              onChange={(e) => GetValue(e, "name")}
              getter={getter}
              setter={setter}
              siteId={editPackageValues.siteId}
            />

            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={editPackageValues.metaDescription}
              onChange={(e) => GetValue(e, "metaDescription")}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTittle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTittle"
              value={editPackageValues.metaTitle}
              onChange={(e) => GetValue(e, "metaTitle")}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={editPackageValues.metaKeywords}
              onChange={(e) => GetValue(e, "metaKeywords")}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="packageStatus"
              value={editPackageValues.status}
              onChange={(e) => GetValue(e, "status")}
            />
            {/* <Form_Input
              type="file"
              label="Package Image"
              name="packageImage"
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

export default EditPackageForm;
