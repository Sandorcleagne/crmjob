import React, { useEffect, useState } from "react";
import Form_Input from "../../Custom-Components/Form_Input";
import Form_Button_Edit from "../../Custom-Components/Form_Button_Edit";
import Form_Select from "../../Custom-Components/Form_Select";
import { apiurl, authCode } from "../../Host";
import Form_Editor from "../../Custom-Components/Form_Editor";
import Form_Grup_Input from "../../API/Check_Location";
import { Update_Location_API } from "../../API/Location_API";
import { EditProduct_API } from "../../API/Product_API";
import Form_CheckBox from "../../Custom-Components/Form_CheckBox";
import { useParams } from "react-router";

const EditProductForm = ({ productId }) => {
  console.log(productId.siteId);
  const [editProductValues, setEditProductValues] = useState({});
  const [countries, setCountries] = useState([]);
  const [packages, setPackages] = useState([]);
  const [vaccationType, setvaccationType] = useState([]);
  const [location, setLocations] = useState([]);
  const [existingLocations, setExistingLocations] = useState([]);
  const [getter, setter] = useState("Check Availability");
  const [urlStatus, setUrlStatus] = useState(false);
  const [urlText, setUrlText] = useState("");

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
        `/getCountriesBySiteIdCRM/${productId.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getPackages = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getPackagesBySiteIdCRM/${productId.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPackages(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getVaccationType = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getVaccationsTypeBySiteIdCRM/${productId.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setvaccationType(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getlocations = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        `/getLocationsBySiteIdCRM/${productId.siteId}?authCode=` +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLocations(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getProductById = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getProductByIdCRM/" +
        productId.productId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditProductValues(result);
        if (result.locations != null) {
          setExistingLocations(result.locations);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const SelectItem = (id, e, name) => {
    if (e.target.checked) {
      existingLocations.push(id);
      setEditProductValues({ ...editProductValues, [name]: existingLocations });
    } else {
      existingLocations.pop(id);
      setEditProductValues({ ...editProductValues, [name]: existingLocations });
    }
  };

  const GetValue = (e, name) => {
    setEditProductValues({ ...editProductValues, [name]: e.target.value });
  };

  const GetContent = (e) => {
    setEditProductValues({
      ...editProductValues,
      [e.target.id]: e.target.getContent(),
    });
  };

  const CheckProductUrl = (e, name) => {
    GetValue(e, name);
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

  const SubmitEditProduct = (e) => {
    e.preventDefault();
    EditProduct_API(editProductValues);
  };

  useEffect(() => {
    getProductById();
    getCountries();
    getPackages();
    getVaccationType();
    getlocations();
  }, []);

  console.log("Edit Product Values", editProductValues);
  console.log("Existing Locations", existingLocations);
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-brands page-icon page-icon fa-product-hunt"></i>
          &nbsp;Edit Product <i class="fa-solid fa-angle-right anglpdod"></i> 
          <span className="form-head-product">{editProductValues.name}</span>
        </h1>
        <form onSubmit={SubmitEditProduct}>
          <div className="row">
            <Form_Select
              label="Select Site"
              name="siteId"
              dropdown={sites}
              id="sites"
              value={editProductValues.siteId}
              onChange={(e) => GetValue(e, "siteId")}
            />
            <Form_Select
              label="Select Country"
              name="countryId"
              dropdown={countries}
              id="countryid"
              value={editProductValues.countryId}
              onChange={(e) => GetValue(e, "countryId")}
            />
            <Form_Select
              label="Select Package"
              name="packageId"
              dropdown={packages}
              id="packageId"
              value={editProductValues.packageId}
              onChange={(e) => GetValue(e, "packageId")}
            />
            <Form_Select
              label="Select Vaccation Type"
              name="vaccationTypeId"
              dropdown={vaccationType}
              id="vaccationTypeId"
              value={editProductValues.vaccationTypeId}
              onChange={(e) => GetValue(e, "vaccationTypeId")}
            />
            <Form_Select
              label="Status"
              dropdown={status}
              id="status"
              name="status"
              value={editProductValues.status}
              onChange={(e) => GetValue(e, "status")}
            />
            {/* <Form_Select
              label="Select Location"
              name="locationId"
              dropdown={location}
              id="countryid"
              value={editProductValues.locationId}
              onChange={(e) => GetValue(e, "locationId")}
            /> */}

            <div className="col-12 col-md-6 col-xxl-4">
              <label className="custom-label">Locations</label>
              {location.map((item) => {
                var isFound =
                  existingLocations !== null
                    ? existingLocations.some((element) => {
                        if (element == item.id) {
                          return true;
                        }
                        return false;
                      })
                    : false;
                return (
                  <Form_CheckBox
                    label={item.name}
                    id={item.id}
                    value={item.id}
                    onChange={(e) => SelectItem(item.id, e, "locations")}
                    checked={isFound ? "checked" : ""}
                  />
                );
              })}
            </div>
            <Form_Input
              label="Meta Description"
              name="metaDescription"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaDescription"
              value={editProductValues.metaDescription}
              onChange={(e) => GetValue(e, "metaDescription")}
            />
            <Form_Input
              label="Meta Title"
              name="metaTitle"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaTitle"
              value={editProductValues.metaTitle}
              onChange={(e) => GetValue(e, "metaTitle")}
            />
            <Form_Input
              label="Meta Keywords"
              name="metaKeywords"
              div_className="col-12 col-md-6 col-xxl-4"
              id="metaKeywords"
              value={editProductValues.metaKeywords}
              onChange={(e) => GetValue(e, "metaKeywords")}
            />
            <Form_Input
              label="Product Name"
              name="name"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productname"
              value={editProductValues.name}
              onChange={(e) => GetValue(e, "name")}
            />
            <Form_Input
              label="Product URL"
              name="productURL"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productURL"
              value={editProductValues.productURL}
              onChange={(e) => CheckProductUrl(e, "productURL")}
              condition={urlStatus ? "input-error" : "input-success"}
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
              value={editProductValues.price}
              onChange={(e) => GetValue(e, "price")}
            />
            <Form_Input
              label="Product Selling Price"
              name="sellingPrice"
              div_className="col-12 col-md-6 col-xxl-4"
              id="sellingPrice"
              value={editProductValues.sellingPrice}
              onChange={(e) => GetValue(e, "sellingPrice")}
            />
            <Form_Input
              label="Product Code(SKU)"
              name="productCode"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productCode"
              value={editProductValues.productCode}
              onChange={(e) => GetValue(e, "productCode")}
            />
            <Form_Input
              label="Product Tags"
              name="productTags"
              div_className="col-12 col-md-6 col-xxl-4"
              id="productTags"
              value={editProductValues.productTags}
              onChange={(e) => GetValue(e, "productTags")}
            />
            <Form_Editor
              label="Product Short Description / Highlights"
              div_className="col-12"
              label_className="col-12 col-md-6 col-xxl-4"
              onChange={(e) => GetContent(e)}
              initaltext={editProductValues.productShortDescription}
              id="productShortDescription"
            />
            <Form_Editor
              label="Product Long Description / Day Wise Itinary"
              div_className="col-12"
              label_className="col-12 col-md-6 col-xxl-4"
              onChange={(e) => GetContent(e)}
              initaltext={editProductValues.productDescription}
              id="productDescription"
            />
            <div className="col-12">
              <hr class="bsub-topline"></hr>
            </div>
            <Form_Button_Edit getter={getter} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
