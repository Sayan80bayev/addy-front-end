import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import SearchBar from "./SeacrhBar";
import CategoryBar from "./CategoryBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const location = useLocation();
  const [message, setMessage] = useState(location.state);

  return (
    <>
      <h1 className="name_of_comp">
        Addy <h2>Buy anything you can find!</h2>
      </h1>

      <main>
        {message?.status == "success" && (
          <h2 className="alert alert-info">{message.message}</h2>
        )}
        {message?.status == "error" && (
          <h2 className="alert alert-danger">{message.message}</h2>
        )}
        {window.history.replaceState({}, "")}
        <SearchBar />
        <CategoryBar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
