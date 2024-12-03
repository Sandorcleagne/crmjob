import React from "react";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
 

const Form_Radio = (props) => {
  const{id,name,value,label,onChange}=props
  return (
      <>
    
<FormControlLabel name={name} value={value} onChange={onChange} control={<Radio />} label={label} /> 
 
    {/* <div className="check-list radio">
        <input type="radio" id={id} name={name} value={value} onChange={onChange}></input>
        <label for={id}>{label}</label>
    </div> */}
      </>
  );
};

export default Form_Radio;
