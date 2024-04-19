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

  return (
    <header>
      <nav>
        <div>
          <img src={process.env.PUBLIC_URL + "/Addy (1).png"} alt="Addy" />
          <a href="/">My Website</a>
          <a href="/index">Home</a>
          <a href="/newAdd">New add</a>
          {authorities ? (
            <button className="btn-no-style" onClick={handleLogout}>
              <a href="/login">Logout</a>
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
          {authorities === "ADMIN" && (
            <a href="/catControll">Controll categories</a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
