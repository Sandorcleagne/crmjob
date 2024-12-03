import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import { useParams } from "react-router";
import EditVaccationTypeForm from "../Atom/Form/EditVaccationTypeForm";

const VaccationTypeEdit = () => {
  const productId = useParams();
  console.log("VaccationTypeId:", productId);
  return (
    <>
      <TopBar />
      <SideBar />
      <EditVaccationTypeForm productId={productId} />
    </>
  );
};

export default VaccationTypeEdit;
