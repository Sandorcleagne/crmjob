import React from 'react'
import TopBar from '../Atom/TopBar/TopBar'
import SideBar from "../Atom/SideBar/SideBar";
import ProductList from "../Molecule/Product/ProductList";

const viewProduct = () =>{
    return(
        <>
            {/* <TopBar/>
            <SideBar/> */}
            <ProductList/>
        </>
    )
}

export default viewProduct;