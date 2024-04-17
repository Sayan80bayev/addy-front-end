import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/FullAdd.css";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import { fetchAddById } from "../api";
import { Carousel } from "react-bootstrap";
import axios from "axios";

export default function FullAdd() {
  const { id } = useParams();
  const [add, setAdd] = useState(null);
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("authToken") ?? "";

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

  console.log(add);
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
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  if (!add) {
    return <div>Loading...</div>;
  }
  const base64ToUrl = (base64) => `data:image/jpeg;base64,${base64}`;
  return (
    <main>
      <div className="ctn-full">
        <div className="ctn children">
          {add.images && add.images.length !== 0 && (
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
          {add.images && add.images.length === 0 && (
            <img
              className="add_img"
              src={process.env.PUBLIC_URL + "/empty.jpg"}
              alt="Contact"
            />
          )}
          <h1>{add.title}</h1>
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
          <h4>
            <img
              className="rec_icon"
              src={process.env.PUBLIC_URL + "/bulb-on-svgrepo-com.png"}
              alt="Recommendation"
            />
            More like this:{" "}
          </h4>
          <div className="ctn-recomendations">
            <img
              className="rec_img"
              src="https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg"
              alt="Recommendation"
            />
            <ul>
              <br />
              <li>
                <p>sayan</p>
              </li>
              <li>
                <p>5000</p>
              </li>
            </ul>
          </div>
          <br />
          <button className="btn btn-danger btn-custom">
            <img
              className="rec_icon"
              src={process.env.PUBLIC_URL + "/arrow-down-svgrepo-com (1).png "}
              alt="See more"
            />
            See more like this
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
