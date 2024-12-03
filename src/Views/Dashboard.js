import React from "react";
import DashboardBar from "../Molecule/Dashboard/DashboardSideBar";
import DashboardData from "../Molecule/Dashboard/Dashboard";
import useAuth from "../Hooks/useAuth";
import { useSelector } from "react-redux";

const Dashboard = () => {
  return (
    <>
      <DashboardData />
    </>
  );
};

export default Dashboard;
