import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import EditCountryForm from "../Atom/Form/EditCountryForm";
import { useParams } from "react-router";

const Country_Edit = () =>{
    const productId = useParams();
    console.log("productId:", productId);
    return(
        <>
            {/* <TopBar/>
            <SideBar/> */}
            <EditCountryForm productId = {productId}/>
        </>
    );
};

export default Country_Edit