import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CategoryBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/public/getCats")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div
      className="category_ctn"
      style={{
        padding: "10px",
        display: "flex",
      }}
    >
      {categories.map((category, index) => (
        <div
          key={index}
          className="category"
          style={{ flex: "1", textAlign: "center" }}
        >
          <Link to={"/index/cat/" + category.category_id}>
            {category.category_name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
