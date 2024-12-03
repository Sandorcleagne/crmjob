import React from "react";
import Form_Button from "../../Custom-Components/Form_Button";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Select from "../../Custom-Components/Form_Select";
import Form_CheckBox from "../../Custom-Components/Form_CheckBox";
import State, { useEffect, useState } from "react";
import Form_Editor from "../../Custom-Components/Form_Editor";
import { apiurl, authCode } from "../../Host";
import { AddProduct_API } from "../../API/Product_API";
import { useNavigate } from "react-router";
import Simple_Input from "../../Custom-Components/Simple_Input";
import { Item } from "semantic-ui-react";

const AddProductForm = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [check, setCheck] = useState([]);
  const [urlStatus, setUrlStatus] = useState(false);
  const [urlText, setUrlText] = useState("");
  const [countryLoading, setCountryLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [productValues, setProductValues] = useState({
    name: "",
    status: "",
    imageName: "",
    productShortDescription: "",
    productDescription: "",
    price: "",
    sellingPrice: "",
    productCode: "",
    userId: "0",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    productTags: "",
    countryId: "",
    packageId: "",
    vaccationTypeId: "",
    siteId: "",
    locations: "",
    productURL: "",
  });

  const status = [
    { id: 1, name: "Active", value: "Active" },
    { id: 2, name: "Deactive", value: "Deactive" },
  ];
  const sites = [
    { id: 1, name: "Travomint-Job", value: 1 },
    { id: 2, name: "ReservationsDeal-Vaccations", value: 2 },
  ];

  const getCountries = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getCountriesBySiteIdCRM/${productValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountryLoading(false);
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
        `/getPackagesBySiteIdCRM/${productValues.siteId}?authCode=` +
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
        `/getVaccationsTypeBySiteIdCRM/${productValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setvaccationType(result);
      })
      .catch((error) => console.log("error", error));
  };

  const [location, setLocations] = useState([]);

  // console.log("locations", location);

  const getlocations = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getLocationsBySiteIdCRM/${productValues.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLocationLoading(false);
        setLocations(result);
      })
      .catch((error) => console.log("error", error));
  };

  const SelectItem = (id, e, name) => {
    if (e.target.checked) {
      check.push(id);
      setProductValues({ ...productValues, [name]: check });
    } else {
      check.pop(id);
    }

    console.log("Product Values", productValues);
  };

  const SubmitCountry = (e) => {
    e.preventDefault();
    AddProduct_API(productValues, navigate);
  };

  const GetValue = (e) => {
    setProductValues({ ...productValues, [e.target.name]: e.target.value });
  };

  const GetContent = (e) => {
    setProductValues({
      ...productValues,
      [e.target.id]: e.target.getContent(),
    });
  };

  const CheckProductUrl = (e) => {
    GetValue(e);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + "/checkProductUrl/" + e.target.value + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.productURL != null) {
          setUrlText(result.productURL + " Already exist in " + result.name);
          setUrlStatus(true);
        } else {
          setUrlStatus(false);
          setUrlText(null);
        }
      })
      .catch((error) => console.log("error", error));
  };

  console.log("Product Values", productValues);

  const masterFunction = () => {
    getCountries();
    getPackages();
    getVaccationType();
    getlocations();
  };

  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-brands page-icon fa-product-hunt"></i>&nbsp;Add Product
        </h1>
        <form onSubmit={SubmitCountry}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="siteId"
              dropdown={sites}
              id="sites"
              value={productValues.siteId}
              onChange={(e) => GetValue(e)}
              onClick={() => masterFunction()}
            />

            <Form_Select
              label="Select Country"
              name="countryId"
              dropdown={countries}
              id="countryid"
              value={productValues.countryId}
              onChange={(e) => GetValue(e)}
              disabled={productValues.siteId == "" ? true : false}
            />

            <Form_Select
              label="Select Package"
              name="packageId"
              dropdown={packages}
              id="packageId"
              value={productValues.packageId}
              onChange={(e) => GetValue(e)}
              disabled={productValues.siteId == "" ? true : false}
            />

            <Form_Select
              label="Select Vaccation Type"
              name="vaccationTypeId"
              dropdown={vaccationType}
              id="vaccationTypeId"
              value={productValues.vaccationTypeId}
              onChange={(e) => GetValue(e)}
              disabled={productValues.siteId == "" ? true : false}
            />

            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="status"
              value={productValues.status}
              onChange={(e) => GetValue(e)}
            />

            <div className="col-12 col-md-6 col-xxl-4">
              <label className="custom">Locations</label>
              {location.map((item) => {
                return (
                  <Form_CheckBox
                    label={item.name}
                    id={item.id}
                    value={item.id}
                    onChange={(e) => SelectItem(item.id, e, "locations")}
                    disabled={productValues.siteId == "" ? true : false}
                  />
                );
              })}
            </div>

            {/* <div className="col-12 col-md-6 col-xxl-4">
              <label>Location</label>
              <Simple_Input
                type="checkbox"
                onChange={(e) => SelectItem(item, e)}
              />
            </div> */}

            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={productValues.metaDescription}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Title"
              name="metaTitle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTitle"
              value={productValues.metaTitle}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={productValues.metaKeywords}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Product Name"
              name="name"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productname"
              value={productValues.name}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Product URL"
              name="productURL"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productURL"
              value={productValues.productURL}
              onChange={(e) => CheckProductUrl(e)}
              condition={urlStatus ? "input-error" : "input-success"}
              conditionValueclassName={
                urlStatus ? "input-error-message" : "input-success-message"
              }
              conditionValue={urlText}
            />
            {/* <Form_Input
              type="file"
              label="Product Image"
              name="productImage"
              div_className="col-12 col-md-6 col-xxl-4"
              accept="image/*"
            /> */}
            <Form_Input
              label="Product Price"
              name="price"
              div_className="col-12 col-md-6 col-xxl-4"
              id="price"
              value={productValues.price}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Product Selling Price"
              name="sellingPrice"
              div_className="col-12 col-md-6 col-xxl-4"
              id="sellingPrice"
              value={productValues.sellingPrice}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Product Code(SKU)"
              name="productCode"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productCode"
              value={productValues.productCode}
              onChange={(e) => GetValue(e)}
            />
            <Form_Input
              label="Product Tags"
              name="productTags"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productTags"
              value={productValues.productTags}
              onChange={(e) => GetValue(e)}
            />
            <Form_Editor
              label="Product Short Description / Highlights"
              div_className="col-12"
              label_className="col-12 col-md-6 col-xxl-4"
              onChange={(e) => GetContent(e)}
              initaltext=""
              id="productShortDescription"
            />
            <Form_Editor
              label="Product Long Description / Day Wise Itinary"
              div_className="col-12"
              label_className="col-12 col-md-6 col-xxl-4"
              onChange={(e) => GetContent(e)}
              initaltext=""
              id="productDescription"
            />

            <Form_Button />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
