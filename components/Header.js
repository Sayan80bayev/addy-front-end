import React from "react";

const handleLogout = () => {
  localStorage.removeItem("authToken");
};

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <img src={process.env.PUBLIC_URL + "/Addy (1).png"} alt="Addy" />
          <a href="/">My Website</a>
          <a href="/index">Home</a>
          <a href="/newAdd">New add</a>
          <a href="/login">
            <button onClick={handleLogout}>New add</button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
