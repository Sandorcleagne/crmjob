export const SidebarConfig = [
  {
    subheader: "Home",
    AccordianIcon: "fa-solid fa-house-chimney",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icons: "fa-house-user",
      },
    ],
  },
  {
    subheader: "Users",
    AccordianIcon: "fa-solid fa-users",
    items: [
      {
        title: "Add Users",
        path: "/dashboard/add-user",
        icons: "fa-user-plus",
      },
      {
        title: "All users",
        path: "/dashboard/all-user",
        icons: "fa-users",
      },
    ],
  },
  {
    subheader: "Candidates",
    AccordianIcon: "fa-solid fa-pen-to-square",
    items: [
      {
        title: "Add Candidates",
        path: "/dashboard/Add-Leads",
        icons: "fa-at",
      },
      {
        title: "Your Candidates",
        path: "/dashboard/Your-Leads",
        icons: "fa-eye",
      },
    ],
  },
];
export const EmpSidebarConfig = [
  {
    subheader: "Home",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icons: "fa-users",
      },
    ],
  },

  {
    subheader: "Leads",
    items: [
      {
        title: "Add leads",
        path: "/dashboard/Add-Leads",
        icons: "fa-at",
      },
      {
        title: "Your leads",
        path: "/dashboard/Your-Leads",
        icons: "fa-eye",
      },
    ],
  },
];
