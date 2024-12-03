import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { async } from "rxjs/internal/scheduler/async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiurl, authCode } from "../../Host";
import Form_Select from "../../Custom-Components/Form_Select";
import Form_Button from "../../Custom-Components/Form_Button";

function ViewPackagesTabel() {
  const [packages, setPackages] = useState([]);
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
    getPackages(e);
  };
  const getPackages = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + `/getPackagesBySiteIdCRM/${siteId.siteId}?authCode=` + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPackages(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => getPackages(), []);
  return (
    <div className="form-box clearfix">
      <div className="container">
        <form onSubmit={handleSumitSiteid}>
          <div className="input-group align-items-end">
            <Form_Select
              label="Select Site ID"
              dropdown={sitesId}
              name="siteId"
              value={siteId.siteId}
              div_className="col-12 col-md-6 col-xxl-4"
              onChange={(e) => GetValue(e)}
            />
            <Form_Button className="px-3 ms-2" />
          </div>
        </form>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#Databases Id</th>
              <th>Country Name</th>
              <th>Create Date</th>
              <th>Status</th>
              <th>Site Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.createDate}</td>
                <td>{item.status}</td>
                <td>{item.siteId}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate(
                        "/Packages/Edit/" + item.id + `/${siteId.siteId}`
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewPackagesTabel;
