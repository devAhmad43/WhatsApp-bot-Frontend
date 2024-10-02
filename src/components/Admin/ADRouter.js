import { Navigate } from "react-router-dom";
import UserDetails from "../UserDetails";
import Error from "../Error";
import { AdminLayout } from "./FullLayoutAdmin";
import Statistics from "../Sidebar Pages/Statistics";
import Users from "../Sidebar Pages/Users";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";

import Suggestions from "../Sidebar Pages/suggestions/suggestion";

// import SendMsg from "../Sidebar Pages/whatsapp/SendMsg";
// import QrScan from "../Sidebar Pages/whatsapp/QrScan";
// import { DoorInfo } from "../Sidebar Pages/whatsapp/doorInfo";
// import Editdoor from "../Sidebar Pages/whatsapp/EditDoor";
import AddSite from "../Sidebar Pages/Sites/AddSite";
import Site from "../Sidebar Pages/Sites/Site";
// import EditSite from "../Sidebar Pages/Sites/EditSite";
import { SiteInfo } from "../Sidebar Pages/Sites/SiteInfo";





export const ThemeRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="starter" /> },

      // { path: "AdminDashboard/starter", exact: true, element: <PrivateRouteAdmin element={<Starter />} /> },
      { path: "starter", exact: true, element: <PrivateRouteAdmin element={<Statistics />} /> },
      { path: "userdetails/:id", exact: true, element: <PrivateRouteAdmin element={<UserDetails />} /> },
      { path: "Suggestions", exact: true, element: <PrivateRouteAdmin element={<Suggestions />} /> },

      // { path: 'AddDoors', exact: true, element: <PrivateRouteAdmin element={<SendMsg />} /> },
      // { path: 'Doors', exact: true, element: <PrivateRouteAdmin element={<QrScan />} /> },
      // { path: "doorInfo/:doorId", exact: true, element: <PrivateRouteAdmin element={<DoorInfo />} /> },
      // { path: "Editdoor/:doorId", exact: true, element: <PrivateRouteAdmin element={<Editdoor />} /> },
      { path: 'Addsite', exact: true, element: <PrivateRouteAdmin element={<AddSite />} /> },
      { path: "sites/", exact: true, element: <PrivateRouteAdmin element={<Site />} /> },
      { path: "EditSite/:quotationId", exact: true, element: <PrivateRouteAdmin element={<AddSite />} /> },
      { path: "siteInfo/:quotationId", exact: true, element: <PrivateRouteAdmin element={<SiteInfo />} /> },


      { path: 'users', exact: true, element: <PrivateRouteAdmin element={<Users />} /> },
      { path: "*", exact: true, element: <Error /> },
      // { path: "starter", exact: true, element: <Statistics /> },
    ],
  },
];


