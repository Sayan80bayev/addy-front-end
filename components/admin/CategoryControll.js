import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchCategories } from "../api";
import Footer from "../Footer";
const CategoryControll = () => {
  const token = localStorage.getItem("authToken");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState("");
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
  }, [message]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/cat/add",
        { category_name: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage({ status: "success", message: "Successfully added!" });
    } catch (error) {
      setMessage({ status: "error", message: "Error occured!" });
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/cat/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage({ status: "success", message: "Successfully deleted!" });
    } catch (error) {
      setMessage({ status: "error", message: "Error occured!" });
      console.log(error);
    }
  };
  return (
    <>
      <main style={{ minHeight: "800px" }}>
        <div>
          {message?.status === "success" && message.message && (
            <p className="alert alert-info">{message.message}</p>
          )}
          {message?.status === "error" && message.message && (
            <p className="alert alert-danger">{message.message}</p>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="category_ctn"
              style={{
                width: "70%",
                padding: "10px",
                display: "flex",
              }}
            >
              {categories.map((category, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <div
                    className="category"
                    style={{ flex: "1", textAlign: "center" }}
                  >
                    {category.category_name}
                  </div>
                  <div
                    className="delete_overlay"
                    onClick={() => handleDelete(category.category_id)}
                  >
                    <img
                      className="delete_icon"
                      src={process.env.PUBLIC_URL + "/plus-svgrepo-com (1).png"}
                      alt="Delete"
                    />
                  </div>
                </div>
              ))}
            </div>
            <form style={{ display: "flex", flexDirection: "column" }}>
              <h4>Category add</h4>
              <label>Category name</label>
              <input
                type="text"
                required
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              />
              <button type="submit" className="mt-2" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default CategoryControll;
