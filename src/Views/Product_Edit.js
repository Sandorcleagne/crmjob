import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import { useParams } from "react-router";
import ProductEditForm from "../Atom/Form/EditProductForm";

const Product_Edit = () => {
  const productId = useParams();
  return (
    <>
      <TopBar />
      <SideBar />
      <ProductEditForm productId={productId} />
    </>
  );
};

export default Product_Edit;
