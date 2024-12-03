import React from 'react'
import AddPaymentsForm from '../Atom/Form/AddPaymentsForm';
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";

const AddPayments = () => {
    return (
        <>
            <TopBar />
            <SideBar />
            <AddPaymentsForm/>
        </>
    )
}

export default AddPayments