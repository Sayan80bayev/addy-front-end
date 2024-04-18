import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { fetchAdvertisementsByCat } from "../api";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdvertisementsByCat(id);
        if (response.data.length === 0) return navigate("/index");
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading && <LoadingIcon />}
      <div className="ctn">
        {advertisements.map((advertisement) => (
          <div key={advertisement.id} className="card-ctn">
            <div className="card">
              {advertisement.images.length > 0 ? (
                <img
                  src={`data:image/jpeg;base64,${advertisement.images[0].imageData}`}
                  alt={`First Image`}
                />
              ) : (
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
