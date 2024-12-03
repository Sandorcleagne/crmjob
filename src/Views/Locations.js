import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import AddLocations from "../Molecule/Location/AddLocations";

const Locations = () => {
  return (
    <>
      <TopBar />
      <SideBar />
      <AddLocations/>
    </>
  );
};

export default Locations;
