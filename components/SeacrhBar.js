import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="search_super">
      <input
        type="text"
        className="search-inp"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={search}
        onChange={handleInputChange}
      />
      <Link
        to={"/index/search/" + search}
        id="search-btn"
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          color: "#FFFFFF",
          width: "25%",
          backgroundColor: "#FF0084",
          justifyContent: "center",
        }}
      >
        <>Search</>
      </Link>
    </div>
  );
};

export default SearchBar;
