import React from 'react'
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import { useParams } from "react-router";
import AddBookingDocs from '../Atom/Form/AddBookingDocs';
const Booking_Docs = () => {
const bookingId = useParams();
const bookingDBID = useParams();
  return (
    <>
      <TopBar />
      <SideBar />
      <AddBookingDocs bookingId={bookingId} bookingDBID={bookingDBID}/>
    </>
  )
}

export default Booking_Docs