import React, { useState } from "react";
import { apiurl, authCode } from "../Host";

const Form_Input = (props) => {
  const {
    label,
    name,
    div_class,
    type,
    accept,
    id,
    onChange,
    value,
    setter,
    getter,
    siteId,
  } = props;

  const [btnClass, setbtnClass] = useState("btn-secondary");
  //   const APIdata= [{
  //     "name": "string"
  //   }]

  function checkLocation() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl + `/checkLocation/${siteId}/` + value + "?authCode=" + authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.name !== "") {
          setbtnClass("btn-danger");
          setter("Alredy Exist!");
        } else {
          setbtnClass("btn-success");
          setter("Availabel");
        }
      })
      .catch((error) => {
        console.log("error");
        setbtnClass("btn-success");
        setter("Availabel");
      });
  }

  return (
    <div className={`${div_class} form-group`}>
      <label>{label}</label>
      <div className="input-group">
        <input
          type={type}
          id={id}
          className="form-control"
          name={name}
          accept={accept}
          onChange={onChange}
          value={value}
        ></input>
        <button
          className={`btn ${btnClass}`}
          type="button"
          id="button-addon2"
          onClick={() => checkLocation()}
        >
          {getter}
        </button>
      </div>
    </div>
  );
};

export default Form_Input;
