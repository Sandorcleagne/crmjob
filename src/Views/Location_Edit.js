import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import { useParams } from "react-router";
import EditLocationForm from "../Atom/Form/EditLocationForm";
import { siteId } from "../Host";

const Location_Edit = () => {
  const productId = useParams();
  console.log("packageID:", productId);
  return (
    <>
      <TopBar />
      <SideBar />
      <EditLocationForm productId={productId} siteId={productId.siteId} />
    </>
  );
};

export default Location_Edit;
