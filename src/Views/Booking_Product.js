import React from "react";
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import { useParams } from "react-router";
import ProductSalesForm from "../Atom/Form/ProductSalesForm";

const Booking_Product = () => {
  const productId = useParams();
  return (
    <>
      <TopBar />
      <SideBar />
      <ProductSalesForm productId={productId}/>
    </>
  );
};

export default Booking_Product;
