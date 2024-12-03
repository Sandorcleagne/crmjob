import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import { useParams } from "react-router";
import EditPackageForm from "../Atom/Form/EditPackageForm";

const Packages_Edit = () => {
  const productId = useParams();
  console.log("packageID:", productId);
  return (
    <>
      <TopBar />
      <SideBar />
      <EditPackageForm productId={productId} />
    </>
  );
};

export default Packages_Edit;
