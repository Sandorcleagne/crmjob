import React from 'react'
import TopBar from '../Atom/TopBar/TopBar'
import SideBar from "../Atom/SideBar/SideBar";
import CreateBooking from '../Molecule/BookingList/CreateBooking';
const Booking = () =>{
    return(
        <>
            {/* <TopBar/>
            <SideBar/> */}
            <CreateBooking/>
        </>
    )
}

export default Booking;