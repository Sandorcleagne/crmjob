import React from "react";
import TopBar from "../Atom/TopBar/TopBar";
import SideBar from "../Atom/SideBar/SideBar";
import ViewPaymentsForm from "../Atom/Form/ViewPaymentsForm";

const ViewPayments = () => {
  return (
    <>
      <TopBar />
      <SideBar />
      <ViewPaymentsForm/>
    </>
  );
};

export default ViewPayments;
