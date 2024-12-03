import React from "react";
import { Sidebar } from "semantic-ui-react";

const ApiTracking=()=>{
    return(
        <>
    <div className="container">
            <div className="row">
                <div className="col-12">
                   <h1 className="Api-head">API Tracking - CRM</h1>
                   <div className="row">
                        <div className="col-4">
                        <input type="date" className="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2023-12-31"/>
                        </div>
                        <div className="col-4">
                        <input type="date" className="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2023-12-31"/>
                        </div>
                        <div className="col-4">
                        <select name="cars" id="cars" className="dropdow-supplier">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
                        </div>
                   </div>
                   <div className="row">
                   <div className="col-3">
                    
                    </div>
                    <div className="col-3">
                    
                    </div>
                    <div className="col-3">
                    
                    </div>
                    <div className="col-3 search-button">
                    <button className="btn btn-primary">Search</button>
                    </div>
                   </div>
                </div>
            </div>
    </div>
        </>
    )
}

export default ApiTracking;