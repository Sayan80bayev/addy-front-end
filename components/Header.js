import React, { useEffect } from "react";
import { useState } from "react";

const Header = () => {
  const [token, setToken] = useState("");
  console.log(token);

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, [localStorage.getItem("authToken")]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };
  return (
    <header>
      <nav>
        <div>
          <img src={process.env.PUBLIC_URL + "/Addy (1).png"} alt="Addy" />
          <a href="/">My Website</a>
          <a href="/index">Home</a>
          <a href="/newAdd">New add</a>
          {token && (
            <button className="btn-no-style" onClick={handleLogout}>
              <a href="/login">Logout</a>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
