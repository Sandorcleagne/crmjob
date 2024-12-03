import React from "react";

function Simple_Select(props) {
  const {div_class, dropdown, id, value, onChange, name,input_class } = props;
  // console.log(dropdown)
  return (
    <div className={`${div_class} form-group`}>
      <select
        className={input_class}
        id={id}
        onChange={onChange}
        name={name}>
        <option value="">-Please Select-</option>
        {dropdown.map((item, i) => (
          value == item.id ? <option id={item.id} value={item.value} selected="selected"> {item.name} </option>:<option id={item.id} value={item.value}> {item.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Simple_Select;
