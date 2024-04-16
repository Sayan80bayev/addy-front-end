import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style/backGround.css";
import "./index.css";
import App from "./components/App";
import Header from "./components/Header";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <>
    <Header />
    <App />
  </>
);
