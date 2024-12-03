import React from 'react'
import TopBar from '../Atom/TopBar/TopBar'
import SideBar from "../Atom/SideBar/SideBar";
import { useParams } from "react-router";
import EditBookingForm from '../Atom/Form/EditBookingForm';
const Booking_Edit = () => {
    const bookingId = useParams();
    return (
        <>
            <TopBar />
            <SideBar />
            <EditBookingForm bookingId={bookingId}/>
        </>
    )
}

export default Booking_Edit