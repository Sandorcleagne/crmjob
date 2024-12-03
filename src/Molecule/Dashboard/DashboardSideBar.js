import React from "react";
import { Sidebar } from "semantic-ui-react";
import SideBar from "../../Atom/SideBar/SideBar";
import TopBar from "../../Atom/TopBar/TopBar";

const DashboardBar=()=>{
    return(
        <>
          <TopBar/>
   <SideBar/>
        </>
    )
}

export default DashboardBar;