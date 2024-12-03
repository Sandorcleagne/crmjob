import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import AddCountry from "../Molecule/Country/AddCountry";


const Country = () => {
  return (
    <>
      <TopBar />
      <SideBar />
      <AddCountry />
    </>
  );
};
export default Country;
