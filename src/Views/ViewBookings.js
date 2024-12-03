import React from "react";
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import ViewBookingList from "../Atom/Form/ViewBookingList";

const ViewBookings = () => {
  return (
    <>
      <TopBar />
      <SideBar />
      <ViewBookingList/>
    </>
  );
};

export default ViewBookings;
