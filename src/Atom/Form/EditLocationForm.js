import React, { useEffect, useState } from "react";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Grup_Input from "../../API/Check_Location";
import { Update_Location_API } from "../../API/Location_API";

const EditLocationForm = ({ productId }) => {
  const { siteId } = productId;
  console.log("siteId;", siteId);
  const [editLocationValues, setEditLocationValues] = useState({});
  const [countries, setCountries] = useState([]);

  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];
  const status = [
    { id: 1, name: "Active", value: 1 },
    { id: 2, name: "Deactive", value: 0 },
  ];
  const [packages, setPackages] = useState([]);
  const [vaccationType, setvaccationType] = useState([]);
  const [getter, setter] = useState("Check Availability");

  const getLocationById = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getLocationById/" +
        productId.productId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Result of Update Location", result);
        setEditLocationValues(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getVaccationType = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + `/getVaccationsTypeBySiteIdCRM/${siteId}?authCode=` + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setvaccationType(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getPackages = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + `/getPackagesBySiteIdCRM/${siteId}?authCode=` + authCode,
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
      apiurl + `/getCountriesBySiteIdCRM/${siteId}?authCode=` + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => console.log("error", error));
  };

  const GetValue = (e, name) => {
    setEditLocationValues({ ...editLocationValues, [name]: e.target.value });
  };
  const SubmitPackage = (e) => {
    e.preventDefault();
    Update_Location_API(editLocationValues);
  };

  console.log(editLocationValues);

  useEffect(() => {
    getPackages();
    getCountries();
    getVaccationType();
    getLocationById();
  }, []);
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">Edit Location</h1>
        <form onSubmit={SubmitPackage}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="site"
              dropdown={sites}
              id="sites"
              value={editLocationValues.siteId}
              onChange={(e) => GetValue(e, "siteId")}
            />
            <Form_Select
              label="Select Country"
              name="countryid"
              dropdown={countries}
              id="countryid"
              value={editLocationValues.countryId}
              onChange={(e) => GetValue(e, "countryId")}
            />
            <Form_Select
              label="Select Package"
              name="packageId"
              dropdown={packages}
              id="countryid"
              value={editLocationValues.packageId}
              onChange={(e) => GetValue(e, "packageId")}
            />
            <Form_Select
              label="Select Vaccation Type"
              name="vaccationTypeId"
              dropdown={vaccationType}
              id="vaccationTypeId"
              value={editLocationValues.vaccationId}
              onChange={(e) => GetValue(e, "vaccationId")}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="status"
              value={editLocationValues.status}
              onChange={(e) => GetValue(e, "status")}
            />
            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={editLocationValues.metaDescription}
              onChange={(e) => GetValue(e, "metaDescription")}
            />
            <Form_Input
              label="Meta Tittle"
              name="metaTittle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTitle"
              value={editLocationValues.metaTitle}
              onChange={(e) => GetValue(e, "metaTitle")}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={editLocationValues.metaKeywords}
              onChange={(e) => GetValue(e, "metaKeywords")}
            />

            <Form_Grup_Input
              label="Location Name"
              name="locationname"
              div_className="col-12 col-md-6 col-xxl-4"
              id="locationname"
              value={editLocationValues.name}
              onChange={(e) => GetValue(e, "name")}
              getter={getter}
              setter={setter}
              siteId={editLocationValues.siteId}
            />
            <Form_Button_Edit getter={getter} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLocationForm;
