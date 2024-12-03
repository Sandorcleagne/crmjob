import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import AddPackage from "../Molecule/Package/AddPackage";

const Packages = () => {
  return (
    <>
      <TopBar />
      <SideBar />
      <AddPackage/>
    </>
  );
};

export default Packages;
