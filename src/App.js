import React, { useContext, useEffect } from "react";
import Login from "./Login";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import Apitracking from "./Views/ApiTracking";
import AutoUser from "./Views/AutoUser";
import BookingList from "./Views/BookingList";
import Auto from "./Views/Auto";
import User from "./Views/Users";
import PaymentDetail from "./Views/PaymentDetail";
import Country from "./Views/Country";
import Packages from "./Views/Packages";
import VaccationType from "./Views/VaccationType";
import Locations from "./Views/Locations";
import Product from "./Views/Product";
import { AuthContext, AuthProvider } from "./API/AuthContextApi";
import useAuth from "./Hooks/useAuth";
import { useSelector } from "react-redux";
import Country_Edit from "./Views/Country_Edit";
import Packages_Edit from "./Views/Packages_Edit";
import Location_Edit from "./Views/Location_Edit";
import VacctionType_Edit from "./Views/VaccationType_Edit";
import Product_Edit from "./Views/Product_Edit";
import ViewProduct from "./Views/ViewProduct";
import Leads from "./Views/AddLeads";
import ViewLeads from "./Views/ViewLeads";
import { RouterProvider, useParams } from "react-router";
import Booking from "./Views/Booking";
import ViewAllUsers from "./Molecule/User/ViewAllUsers";
import User_Edit from "./Views/User_Edit";
import Booking_Edit from "./Views/Booking_Edit";
import Profile_Page from "./Views/Profile_Page";
import ViewBookings from "./Views/ViewBookings";
import Booking_View from "./Views/Booking_View";
import AddPayments from "./Views/AddPayments";
import ViewPayments from "./Views/ViewPayments";
import Payment_Edit from "./Views/Payment_Edit";
import Booking_Product from "./Views/Booking_Product";
import Booking_Docs from "./Views/Booking_Docs";
import Product_Images from "./Views/Product_Images";
import { Router } from "./routes";
import ErrorPage from "./Views/ErrorPage";
import GuestGuard from "./Guards/GuestGuard";
import AuthGuards from "./Guards/AuthGuards";
import MainLayout from "./Layout/MainLayout";
import AddUserFrom from "./Atom/Form/AddUserFrom";
import EditUserForm from "./Atom/Form/EditUserForm";
import Example from "./Views/Example";
import JoiningNotification from "./Views/JoiningNotification";
import Notification from "./Views/Notification";
function App() {
  const url = useParams();

  useEffect(() => {}, [url]);

  const router = createBrowserRouter([
    {
      path: "",
      children: [
        {
          path: "",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        // {
        //   path: "register",
        //   element: (
        //     <GuestGuard>
        //       <Register />
        //     </GuestGuard>
        //   ),
        // },
      ],
    },

    {
      path: "/dashboard",
      element: (
        <AuthGuards>
          <MainLayout />
        </AuthGuards>
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "Add-Leads", element: <Leads /> },
        { path: "Your-Leads", element: <ViewLeads /> },
        { path: "add-user", element: <AddUserFrom /> },
        { path: "all-user", element: <ViewAllUsers /> },
        { path: "edit-user/:userId", element: <EditUserForm /> },
        { path: "profile-user/View/:leadId", element: <Profile_Page /> },
        { path: "example", element: <Example /> },
        { path: "interviewnotification", element: <Notification /> },
        { path: "joiningnotification", element: <JoiningNotification /> },
        // { path: "profile-user/View/:leadId", element: <Profile_Page /> },
        // { path: "schedulescandidates", element: <ScheduledCandidate /> },
      ],
    },
  ]);

  return (
    <>
      {/* <BrowserRouter> */}
      {/* <Router /> */}
      <RouterProvider router={router} />
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
