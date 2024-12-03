import React, { useEffect } from "react";
import { useParams } from "react-router";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import AddUser from "../Molecule/User/AddUser";

const User = () =>{

    return(
        <>
            {/* <TopBar/>
            <SideBar/> */}
            <AddUser/>
        </>
    )
}

export default User