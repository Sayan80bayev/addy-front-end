import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageAll = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from backend when component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <h2>All Images</h2>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={`data:image/jpeg;base64,${image.imageData}`}
              alt={image.name}
            />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageAll;
