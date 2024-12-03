import React from "react";
import { Outlet } from "react-router";
import SideBar from "../Atom/SideBar/SideBar";
import TopBar from "../Atom/TopBar/TopBar";

const MainLayout = () => {
  return (
    <div>
      <TopBar />
      <SideBar /> <Outlet />
    </div>
  );
};

export default MainLayout;
