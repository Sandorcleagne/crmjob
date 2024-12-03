import React from "react";
import Button from '@mui/material/Button';
import {Send} from '@mui/icons-material';


const Form_Button = (props) => {
  const { onClick, getter } = props;
  // console.log("getter",getter);
  return (
    <div className="col-12 col-md-6 col-xxl-4 form-group">   
      <Button
    variant="contained" 
    type={"submit"}
    disableElevation 
    onClick={onClick}
    disabled={getter === "Alredy Exist!" ? true : false}
   sx={{ height: '50px',fontWeight : "700", fontFamily : '"Quicksand", sans-serif', 
    fontSize : "17px", minWidth : "160px", backgroundColor : "#2a6ca8",'&:hover': {
      backgroundColor: '#115496', 
  }}}
    size="large" endIcon={<Send  />}>
    SUBMIT <i class="fa-solid fa-paper-plane-top"></i>
    </Button>
    </div>
  );
};

export default Form_Button;
