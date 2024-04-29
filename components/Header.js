import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [authorities, setAuthorities] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setAuthorities(decodedToken.authorities);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthorities(null);
  };
  const handleMenu = () => {
    const el = document.querySelector(".navigation");
    el.classList.toggle("disable");
    const bars = document.querySelectorAll(".bar");
    if (el.classList.contains("disable")) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bars[0].style.transform = "rotate(0) translate(0)";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "rotate(0) translate(0)";
    }
  };
  return (
    <header>
      <nav>
        <div>
          <img src={process.env.PUBLIC_URL + "/Addy (1).png"} alt="Addy" />
          <button className="menu-button" onClick={() => handleMenu()}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <div className="navigation">
            <a href="/">My Website</a>
            <a href="/index">Home</a>
            <a href="/newAdd">New add</a>
            {authorities ? (
              <button className="btn-no-style" onClick={handleLogout}>
                <a href="/login?out">Logout</a>
              </button>
            ) : (
              <a href="/login">Login</a>
            )}
            {authorities === "ADMIN" && (
              <a href="/catControll">Controll categories</a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
