import React from "react";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const Form_AutoComplete = (props) => {
  const { label, name, div_class, type, options, setSelectedProducts } = props;
  const [searchValue, setSearch] = useState("");
  const [searchid, setSearchid] = useState({});
  const [showmenu, setshowmenu] = useState(false);
  const setSearchValue = (e) => {
    setSearch(e.target.value);
    setshowmenu(true);
  };
  const getSearchid = (id, val) => {
    setSearchid({
      id: id,
      val: val,
    });
  };
  setSelectedProducts(searchid);

  return (
  <>
    <Dropdown>
    <div className={`${div_class} form-group dropdown`}>
      <label className="col-3">{label}</label>
      <Dropdown.Toggle className="p-0 border-0 w-100">
      <input
        type={type}
        className={`col-3`}
        name={name}
        onChange={(e) => setSearchValue(e)}
        value={searchValue}
      ></input>
    </Dropdown.Toggle>

    <Dropdown.Menu className="w-100 mt-1 border-0 shadow-lg"> 

      {options
          .filter(
            ({ name }) =>
              searchValue === "" ||
              name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => ( 
              <Dropdown.Item 
                href={undefined}
                onClick={(e) => {
                  setSearch(e.target.getAttribute("value"));
                  getSearchid(
                    e.target.getAttribute("id"),
                    e.target.getAttribute("value")
                  );
                  setshowmenu(false);
                }}
                value={item.name}
                id={item.id}
              >
                {item.name}
              </Dropdown.Item> 
          ))}

    </Dropdown.Menu>
     
      
    </div>
  </Dropdown>
  
   
  </>
  );
};

export default Form_AutoComplete;
