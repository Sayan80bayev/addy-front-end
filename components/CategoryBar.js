import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "./api";

function CategoryBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="category_ctn"
      style={{
        padding: "10px",
        display: "flex",
      }}
    >
      <div className="category" style={{ flex: "1", textAlign: "center" }}>
        <Link to="/index">All</Link>
      </div>
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
