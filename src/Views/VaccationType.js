import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import AddVaccationType from "../Molecule/VaccationType/AddVaccationType";
const VaccationType = () => {
  return (
    <>
      <TopBar/>
      <SideBar />
      <AddVaccationType/>
    </>
  );
};

export default VaccationType;
