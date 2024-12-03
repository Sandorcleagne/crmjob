import React from "react";
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import { useParams } from "react-router";
import ViewBooking from "../Atom/Form/ViewBooking";

const Booking_View = () => {
  const bookingId = useParams();
  return (
    <>
      <TopBar />
      <SideBar />
      <ViewBooking bookingId={bookingId}/>
    </>
  );
};

export default Booking_View;
