import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Template = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Template;
