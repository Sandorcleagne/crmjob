import React from "react";

const Form_CheckBox = (props) => {
  const{id,name,value,label,onChange,checked}=props
  return (
    <div className="check-list">
        <input type="checkbox" id={id} name={name} value={value} onChange={onChange} checked={checked}></input>
        <label for={id}>{label}</label>
    </div>
  );
};

export default Form_CheckBox;
