import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/AddForms.css";
import Footer from "../Footer";

function NewAdvertisementForm() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const filteredImages = imageFiles.filter((file) =>
      validImageTypes.includes(file.type)
    );

    if (filteredImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...filteredImages]);
    } else {
      console.error("Invalid image format. Please select JPEG or PNG images.");
    }
  };

  const handleImageDelete = (deletedImage) => {
    const filteredImages = images.filter((image) => image !== deletedImage);
    setImages(filteredImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    const json = JSON.stringify({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      category: {
        category_id: formData.category_id,
      },
    });
    const blob = new Blob([json], {
      type: "application/json",
    });
    formDataToSend.append("advertisement", blob);
    formDataToSend.append("files", new Blob([]));
    for (const image of images) {
      formDataToSend.append("files", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/secured/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Advertisement saved successfully:", response.data);
    } catch (error) {
      console.error("Failed to save advertisement:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/public/getCats"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const imageIconPath = process.env.PUBLIC_URL + "/plus-svgrepo-com.png";
  if (!localStorage.getItem("authToken")) {
    return navigate("/login", {
      state: { status: "success", message: "First you need to login!" },
    });
  }
  return (
    <main>
      <div className="mb-5">
        <h2>Add New Advertisement</h2>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h4>
              <label htmlFor="title">Title:</label>
            </h4>
            <input
              className="form-input"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <h4>
              <label htmlFor="description">Description:</label>
            </h4>
            <textarea
              className="form-input"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <h4>
              <label htmlFor="price">Price:</label>
            </h4>
            <input
              type="number"
              className="form-input"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <h4>
              <label htmlFor="category">Category:</label>
            </h4>
            <select
              name="category_id" // Changed from "category" to "category_id"
              className="form-select"
              value={formData.category_id}
              onChange={handleChange} // Changed from handleChange to handleCategoryChange
            >
              <option value="">Select Category</option> // Added value attribute
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <h4>
              <label htmlFor="image">Image:</label>
            </h4>
            <div className="image-selector">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                hidden
              />
              <label htmlFor="image-upload">
                <i className="fas fa-plus"></i>
                <img className="rec_icon" src={imageIconPath} alt="Addy" />
              </label>
              <div className="selected-images">
                {images.map((image, index) => (
                  <div key={index} className="img-ctn">
                    <img
                      className="img"
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                    />
                    <button
                      className="delete_button"
                      onClick={() => handleImageDelete(image)}
                    >
                      <img
                        className="delete_icon"
                        src={imageIconPath}
                        alt="Addy"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </main>
  );
}

export default NewAdvertisementForm;
