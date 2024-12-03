import React from "react";
import Button from '@mui/material/Button';
import {Send} from '@mui/icons-material';


const Form_Button = (props) => {
  const { onClick, getter, div_class, value, className } = props;
  return (
    <div className={`${div_class} form-group text-right`}>  
       <Button
    variant="contained" 
    type={"submit"}
    disableElevation 
    onClick={onClick} 
    disabled={ getter === "Alredy Exist!" || getter === "Check Availability" ? true : false } 
    sx={{ height: '50px',fontWeight : "700", fontFamily : '"Quicksand", sans-serif', 
    fontSize : "17px", minWidth : "160px", backgroundColor : "#2a6ca8", '&:hover': {
      backgroundColor: '#115496', 
  }}}
    size="large" endIcon={<Send  />}>
    SUBMIT 
    </Button>
    </div>
  );
};

export default Form_Button;

