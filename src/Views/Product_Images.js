import React from "react";
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import { useParams } from "react-router";
import AddProductImages from "../Atom/Form/AddProductImages";

const Product_Images = () => {
  const productId = useParams();
  const productSku = useParams();
  return (
    <>
      <TopBar />
      <SideBar />
      <AddProductImages productId={productId} productSku={productSku} />
    </>
  );
};

export default Product_Images;
