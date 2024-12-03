import React from "react";


const Simple_Input = (props) => {
    const{name,div_class,type,accept,id,onChange,value,input_class,onClick}=props
    return (
        <div className={`${div_class} form-group`}>
          <input id={id} type={type} className={input_class} name={name} accept={accept} onChange={onChange} onClick={onClick} value={value} ></input>
        </div>
    );
  };
  
export default Simple_Input;