import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { searchAdvertisements } from "../api";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchAdvertisements(name);
        setAdvertisements(data);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

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
