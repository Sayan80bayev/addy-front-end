import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LoadingIcon from "./LoadingIcon";
import SearchBar from "./SeacrhBar";
import CategoryBar from "./CategoryBar";
export default function Home() {
  return (
    <>
      <h1 className="name_of_comp">
        Addy <h2>Buy anything you can find!</h2>
      </h1>

      <main>
        <SearchBar />
        <CategoryBar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
