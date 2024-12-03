import React from "react";
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import { useParams } from "react-router";
import EditPaymentFrom from "../Atom/Form/EditPaymentFrom";

const Payment_Edit = () => {
  const paymentId = useParams();
  return (
    <>
      <TopBar />
      <SideBar />
      <EditPaymentFrom paymentId={paymentId}/>
    </>
  );
};

export default Payment_Edit;
