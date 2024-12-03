// import React from "react";
// import { createBrowserRouter, Navigate, useRoutes } from "react-router-dom";
// import AddUserFrom from "../Atom/Form/AddUserFrom";
// import EditUserForm from "../Atom/Form/EditUserForm";
// import AuthGuards from "../Guards/AuthGuards";
// import GuestGuard from "../Guards/GuestGuard";
// import MainLayout from "../Layout/MainLayout";
// import Login from "../Login";
// import ViewAllUsers from "../Molecule/User/ViewAllUsers";
// import Leads from "../Views/AddLeads";
// import Dashboard from "../Views/Dashboard";
// import ErrorPage from "../Views/ErrorPage";
// import Example from "../Views/Example";
// import JoiningNotification from "../Views/JoiningNotification";
// import Notification from "../Views/Notification";
// import Profile_Page from "../Views/Profile_Page";
// import ScheduledCandidate from "../Views/ScheduledCandidate";
// import ViewLeads from "../Views/ViewLeads";
export const Router = () => {
  // return useRoutes([
  //   {
  //     path: "",
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         path: "",
  //         element: (
  //           <GuestGuard>
  //             <Login />
  //           </GuestGuard>
  //         ),
  //         errorElement: <ErrorPage />,
  //       },
  //       // {
  //       //   path: "register",
  //       //   element: (
  //       //     <GuestGuard>
  //       //       <Register />
  //       //     </GuestGuard>
  //       //   ),
  //       // },
  //     ],
  //   },
  //   {
  //     path: "/dashboard",
  //     element: (
  //       <AuthGuards>
  //         <MainLayout />
  //       </AuthGuards>
  //     ),
  //     errorElement: <ErrorPage />,
  //     children: [
  //       { path: "", element: <Dashboard /> },
  //       { path: "Add-Leads", element: <Leads /> },
  //       { path: "Your-Leads", element: <ViewLeads /> },
  //       { path: "add-user", element: <AddUserFrom /> },
  //       { path: "all-user", element: <ViewAllUsers /> },
  //       { path: "edit-user/:userId", element: <EditUserForm /> },
  //       { path: "profile-user/View/:leadId", element: <Profile_Page /> },
  //       { path: "example", element: <Example /> },
  //       { path: "interviewnotification", element: <Notification /> },
  //       { path: "joiningnotification", element: <JoiningNotification /> },
  //       // { path: "profile-user/View/:leadId", element: <Profile_Page /> },
  //       // { path: "schedulescandidates", element: <ScheduledCandidate /> },
  //     ],
  //   },
  // ]);
};
