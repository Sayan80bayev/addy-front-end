import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/AddForms.css";
import Footer from "../Footer";
import { fetchAddById, fetchCategories } from "../api";

function EditAdvertisement() {
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("authToken");
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
    const validImageExtensions = [".jpg", ".jpeg", ".png"];

    const filteredImages = files.filter((file) => {
      if (!file.type || file.type === "") {
        file.type = "image/png"; // Default to PNG if type is empty
      }

      const extension = file.name.toLowerCase().slice(-4);
      return (
        validImageExtensions.includes(extension) &&
        file.type.startsWith("image/")
      );
    });

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

    // Convert advertisement data to JSON string and append it as a Blob
    const advertisementData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      category: {
        category_id: formData.category_id,
      },
    };
    const advertisementBlob = new Blob([JSON.stringify(advertisementData)], {
      type: "application/json",
    });
    formDataToSend.append("advertisement", advertisementBlob);
    for (const image of images) {
      formDataToSend.append("files", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/secured/edit/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Advertisement saved successfully:", response.data);
      navigate("/index", {
        state: {
          status: "success",
          message: "Advertisement saved successfully",
        },
      });
    } catch (error) {
      console.error("Failed to save advertisement:", error);
      navigate("/index", {
        state: { status: "error", message: "Failed to save advertisement" },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        const adResponse = await fetchAddById(id);
        const formDataFromObject = {
          title: adResponse.data.title || "",
          description: adResponse.data.description || "",
          price: adResponse.data.price.toString() || "",
          category_id: adResponse.data.category.category_id.toString() || "",
        };
        const decodedFiles = adResponse.data.images.map((imageData) => {
          // Assuming imageData.imageData is base64 encoded image data
          const byteCharacters = atob(imageData.imageData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          // Set the type of the file to 'image/png' or your appropriate image type
          const file = new File([byteArray], imageData.fileName, {
            type: "image/png", // or set it to the appropriate image type based on your data
          });

          return file;
        });

        // Update the state variable with the decoded files
        setImages(decodedFiles);

        setFormData(formDataFromObject);
        setCategories(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);
  console.log(images);
  const imageIconPath = process.env.PUBLIC_URL + "/plus-svgrepo-com.png";
  if (!localStorage.getItem("authToken")) {
    return navigate("/login", {
      state: { status: "success", message: "First you need to login!" },
    });
  }
  return (
    <main>
      <div className="mb-5">
        <h2>Edit Advertisement</h2>
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
                      src={image.src ?? URL.createObjectURL(image)} // Changed from URL.createObjectURL(image) to image.src
                      alt={`Image ${index + 1}`}
                    />
                    <button
                      className="delete_button"
                      onClick={() => handleImageDelete(image)}
                    >
                      <img
                        className="delete_icon"
                        src={
                          process.env.PUBLIC_URL + "/plus-svgrepo-com (1).png"
                        }
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

export default EditAdvertisement;
