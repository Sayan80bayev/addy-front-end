import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import AdvertisementList from "./adds/AdvertisementList";
import ByCategory from "./adds/ByCategory";
import Home from "./Home";
import FullAdd from "./adds/FullAdd";
import SearchAd from "./adds/SearchAd";
import SimilarAdds from "./adds/SimilarAdds";
import AdvertisementForm from "./adds/AdvertisementForm";
import Template from "./Template";
import CategoryControll from "./admin/CategoryControll";

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
          element: <AdvertisementForm isEditing={false} />,
        },
        {
          path: "/catControll",
          element: <CategoryControll />,
        },
        {
          path: "/edit/:id",
          element: <AdvertisementForm isEditing={true} />,
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
              path: "/index/similars/:id/:cat_id/:price",
              element: <SimilarAdds />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
