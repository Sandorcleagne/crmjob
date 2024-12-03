import React from "react";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";
import { useParams } from "react-router";
import EditUserForm from "../Atom/Form/EditUserForm";
const User_Edit = () => {
  const userId = useParams();
  console.log("userId:", userId);
  return (
    <>
      <TopBar />
      <SideBar />
      {/* <EditUserForm userId={userId} /> */}
    </>
  );
};

export default User_Edit;
