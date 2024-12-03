import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { async } from "rxjs/internal/scheduler/async";
import { apiurl, authCode, siteId } from "../../Host";
import Load from "../../Image/product-loader.json";
import Lottie from "react-lottie";
import Form_Select from "../../Custom-Components/Form_Select";
import Form_Button from "../../Custom-Components/Form_Button";
import { DeleteImageByID } from "../../API/DeleteProducyImage";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [siteId, setSiteId] = useState({ siteId: "" });
  const GetValue = (e) => {
    setSiteId({ ...siteId, [e.target.name]: e.target.value });
  };
  const sitesId = [
    { id: 1, name: "Travomint-Vacations" },
    { id: 2, name: "ReservationsDeal-Vacations" },
  ];
  const handleSumitSiteid = (e) => {
    e.preventDefault();
    getProducts(e);
  };
  const getProducts = async () => {
    setLoader(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
      "/getProductsBySiteId/" +
      siteId.siteId +
      "?authCode=" +
      authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Load,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => getProducts(), [setProducts]);
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h1 className="form-head">
          <i className="fa-brands page-icon page-icon fa-product-hunt"></i>
          &nbsp;Products
        </h1>
        <form onSubmit={handleSumitSiteid}>
          <div className="input-group align-items-end">
            <Form_Select
              label="Select Site ID"
              dropdown={sitesId}
              name="siteId"
              value={siteId.siteId}
              div_className="col-12 col-md-6 col-xxl-4 "
              onChange={(e) => GetValue(e)}
            />
            <Form_Button
              disabled={siteId.siteId == "" ? true : false}
              className="px-3 ms-2"
            />
          </div>
        </form>
        {/* {loader ? (
          <div className="loader-lotti">
            <Lottie options={defaultOptions} height={250} width={250} />
          </div>
        ) : (
          ""
        )} */}

        <Table responsive="sm" className={loader ? "parent-form" : ""}>
          <thead>
            <tr>
              <th>#Databases Id</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Status</th>
              {/* <th>User Id</th> */}
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.productCode}</td>
                <td>{item.status}</td>
                {/* <td>Table cell</td> */}
                <td>{item.createDate}</td>
                <td>
                  {/* <button
                    className="btn btn-success"
                    onClick={() => navigate("/Product/Edit/" + item.id + "")}
                  >
                    Edit
                  </button> */}
                  <div
                    className="btn-group-s d-flex"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      className="btn btn-success mw-auto mx-1"
                      onClick={() =>
                        navigate(
                          "/Product/Edit/" + item.id + `/${siteId.siteId}`
                        )
                      }
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning mw-auto mx-1"
                      onClick={() => navigate("/Product/Sales/" + item.id + "")}
                    >
                      <i className="fa-solid fa-money-bill-1-wave"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mw-auto mx-1"
                      onClick={() =>
                        navigate(
                          "/Product/ImagesUpload/" +
                          item.id +
                          "/" +
                          item.productCode +
                          ""
                        )
                      }
                    >
                      <i className="fa-solid fa-image"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
