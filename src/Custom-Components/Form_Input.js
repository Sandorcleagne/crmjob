import React from "react";

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
    condition,
    conditionValue,
    conditionValueClass,
    disabled,
    required,
    maxLength,
  } = props;
  return (
    <div className="col-12 col-md-6 col-xxl-4 mb-btmsp form-group">
      <div className={`${div_class}  position-relative`}>
        <label className="flaot-labelbm">{label}</label>
        <input
          id={id}
          type={type}
          className={`${condition}`}
          name={name}
          accept={accept}
          onChange={onChange}
          value={value}
          required={required ? "" : required}
          disabled={disabled}
          maxLength={maxLength}
        ></input>
        {conditionValue ? (
          <span className={conditionValueClass}>{conditionValue}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Form_Input;
