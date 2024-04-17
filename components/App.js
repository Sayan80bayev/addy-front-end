import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import AdvertisementList from "./adds/AdvertisementList";
import ByCategory from "./adds/ByCategory";
import Home from "./Home";
import FullAdd from "./adds/FullAdd";
import SearchAd from "./adds/SearchAd";
import NewAdvertisementForm from "./adds/NewAdvertisementForm";
import EditAdvertisement from "./adds/EditAdvertisement";
import Template from "./Template";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "",
      element: <Template />,
      children: [
        {
          path: "/newAdd",
          element: <NewAdvertisementForm />,
        },
        {
          path: "/edit/:id",
          element: <EditAdvertisement />,
        },
        {
          path: "/view/:id",
          element: <FullAdd />,
        },
        {
          path: "/index",
          element: <Home />,
          children: [
            {
              path: "/index",
              element: <AdvertisementList />,
            },
            {
              path: "/index/cat/:id",
              element: <ByCategory />,
            },
            {
              path: "/index/search/:name",
              element: <SearchAd />,
            },
            {
              path: "/index/cat/:id",
              element: <ByCategory />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
