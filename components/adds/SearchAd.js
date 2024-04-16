import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();
  useEffect(() => {
    fetchAdvertisements();
  }, [name]);

  const fetchAdvertisements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/public/search/" + name
      );
      setAdvertisements(response.data);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingIcon />}
      <div className="ctn">
        {advertisements.map((advertisement) => (
          <div key={advertisement.id}>
            <div className="card">
              {/* Check if there are images */}
              {advertisement.images.length > 0 ? (
                // Display the first image if available
                <img
                  src={`data:image/jpeg;base64,${advertisement.images[0].imageData}`}
                  alt={`First Image`}
                />
              ) : (
                // Display a placeholder image if no images available
                <img
                  src={process.env.PUBLIC_URL + "/empty.jpg"}
                  alt={advertisement.title}
                />
              )}
              <div className="card-info">
                <Link to={"/view/" + advertisement.id} className="link_to_full">
                  <h5>{advertisement.title}</h5>
                </Link>
                <p className="price">
                  <b>{advertisement.price}</b>
                </p>
                <p>
                  <small>{advertisement.date}</small>
                </p>
                <p>{advertisement.category.category_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdvertisementList;
