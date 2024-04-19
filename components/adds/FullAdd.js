import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../style/FullAdd.css";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import { fetchAddById } from "../api";
import { Carousel } from "react-bootstrap";
import { findSimilars } from "../api";
import axios from "axios";

export default function FullAdd() {
  const { id } = useParams();
  const [add, setAdd] = useState(null);
  const [similars, setSimilars] = useState(null);
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("authToken") ?? "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAddById(id);
        setAdd(result.data);
      } catch (error) {
        console.error("Error fetching add:", error);
      }
    };

    fetchData();
  }, [id, token]);

  useEffect(() => {
    try {
      const data = jwtDecode(token).sub ?? null;
      setEmail(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  useEffect(() => {
    const findSimilarsAds = async () => {
      try {
        // Ensure 'add' is not null and has a valid category
        if (add.id && add.category && add.category.category_id && add.price) {
          const data = await findSimilars(
            add.category.category_id,
            add.price,
            add.id
          );
          setSimilars(data);
        }
      } catch (error) {
        console.error("Error fetching similar ads:", error);
      }
    };
    findSimilarsAds();
  }, [add]);
  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        "http://localhost:3001/api/secured/delete/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return navigate("/index", {
        state: { status: "success", message: "Successfully deleted" },
      });
    } catch (error) {
      return navigate("/index", {
        state: { status: "error", message: "Couldn't deleted" },
      });
    }
  };
  if (!add) {
    return <div>Loading...</div>;
  }
  console.log(add);
  const base64ToUrl = (base64) => `data:image/jpeg;base64,${base64}`;
  return (
    <main>
      <div className="ctn-full">
        <div className="ctn children">
          {add.images && add.images.length > 1 && (
            <Carousel>
              {add.images.map((imageObj, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={base64ToUrl(imageObj.imageData)}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          {add.images && add.images.length == 1 && (
            <img
              className="add_img"
              src={base64ToUrl(add.images[0].imageData)}
              alt="Contact"
            />
          )}
          {add.images && add.images.length === 0 && (
            <img
              className="add_img"
              src={process.env.PUBLIC_URL + "/empty.jpg"}
              alt="Contact"
            />
          )}
          <h1
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {add.title}{" "}
          </h1>
          <h2 className="price">{add.price}</h2>
          <h6>
            <img
              className="rec_icon"
              src={process.env.PUBLIC_URL + "/description-svgrepo-com.png"}
              alt="Add"
            />
            Description:
          </h6>
          <p>{add.description}</p>
          <h6>
            <img
              className="rec_icon"
              src={process.env.PUBLIC_URL + "/category-svgrepo-com.png"}
              alt="Add"
            />
            Categories:
          </h6>
          <p>{add.category && add.category.category_name}</p>{" "}
          <div className="views">
            <img
              className="rec_icon "
              src={process.env.PUBLIC_URL + "/view-eye-svgrepo-com.png"}
            />
            <h6 style={{ display: "block" }}>{add.views}</h6>
          </div>
        </div>
        <div className="ctn-additional">
          <div className="ctn-p-profile">
            <h5>
              <img
                className="rec_icon"
                src={process.env.PUBLIC_URL + "/author-sign-svgrepo-com.png"}
                alt="Add"
              />
              Author:
            </h5>
            <div className="ctn-profile">
              <h6>{add.email}</h6>
              <img
                src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                alt="Profile"
              />
            </div>
            {email === add.email && (
              <div className="ctn-actions mb-4 mt-4">
                <Link to={"/edit/" + id} className="btn btn-danger btn-custom">
                  <img
                    src={process.env.PUBLIC_URL + "/edit-3-svgrepo-com.png"}
                    alt="Edit"
                    style={{ height: "20px" }}
                  />
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-custom"
                  onClick={() => handleDelete()}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/delete-clipboard-svgrepo-com.png"
                    }
                    alt="Delete"
                    style={{ height: "20px" }}
                  />
                  Delete
                </button>
              </div>
            )}
            {email !== add.email && (
              <button className="mt-4 mb-4 btn btn-danger btn-custom">
                <img
                  className="rec_icon"
                  src={
                    process.env.PUBLIC_URL +
                    "/call-dropped-rounded-svgrepo-com.png"
                  }
                  alt="Contact"
                />
                Contact with author
              </button>
            )}
          </div>
          {similars != null && similars.length > 0 && (
            <>
              <h4>
                <img
                  className="rec_icon"
                  src={process.env.PUBLIC_URL + "/bulb-on-svgrepo-com.png"}
                  alt="Recommendation"
                />
                More like this:{" "}
              </h4>
              {similars.slice(0, 3).map((ad, i) => (
                <div className="ctn-recomendations" key={i}>
                  {ad.images.length > 0 ? (
                    <img
                      className="rec_img"
                      src={`data:image/jpeg;base64,${ad.images[0].imageData}`}
                      alt={`First Image`}
                    />
                  ) : (
                    <img
                      className="rec_img"
                      src={process.env.PUBLIC_URL + "/empty.jpg"}
                      alt={ad.title}
                    />
                  )}
                  <ul>
                    <br />
                    <li>
                      <p>{ad.title}</p>
                    </li>
                    <li>
                      <p>{ad.price}</p>
                    </li>
                  </ul>
                </div>
              ))}
              <br />
              {similars.length > 3 && (
                <button className="btn btn-danger btn-custom">
                  <img
                    className="rec_icon"
                    src={
                      process.env.PUBLIC_URL +
                      "/arrow-down-svgrepo-com (1).png "
                    }
                    alt="See more"
                  />
                  See more like this
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
