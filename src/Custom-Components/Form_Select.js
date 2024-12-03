import React from "react";

function Form_Select(props) {
  const {
    label,
    dropdown,
    id,
    value,
    onChange,
    name,
    divClass,
    disabled,
    onClick,
    validate,
  } = props;
  // console.log(dropdown)
  return (
    <div className={divClass ? divClass : "col-12 col-md-6 col-xxl-4 mb-btmsp form-group"}>
     <div className="position-relative">
       <label className="flaot-labelbm">{label}</label>
      <select 
        id={id}
        onChange={onChange}
        name={name}
        required
        disabled={disabled}
        onClick={onClick}
      >
        <option value="">-Please Select-</option>
        {dropdown.map((item, i) =>
          value == item.id ? (
            <option
              id={item.id}
              value={item.id}
              name={item.name}
              selected="selected"
            >
              {" "}
              {item.name}
              {item.userName}{" "}
            </option>
          ) : (
            <option id={item.id} value={item.id} name={item.name}>
              {" "}
              {item.name} {item.userName}
            </option>
          )
        )}
      </select>
     </div>
    </div>
  );
}

export default Form_Select;
