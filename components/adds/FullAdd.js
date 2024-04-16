import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../style/FullAdd.css";
import Footer from "../Footer";

export default function FullAdd() {
  const { id } = useParams(); // Destructure id from the params object
  const [add, setAdd] = useState(null); // Initialize state as null or the appropriate initial value

  useEffect(() => {
    const fetchAdd = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3001/api/v1/public/add/" + id
        );
        setAdd(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdd();
  }, [id]);

  console.log(add);
  return (
    <main>
      <div className="ctn-full">
        {add && (
          <div className="ctn children">
            <img
              className="add_img"
              src={process.env.PUBLIC_URL + "/empty.jpg"}
            />
            <h1>{add.title}</h1>
            <h2 className="price">{add.price}</h2>
            <h6>
              <img
                className="rec_icon"
                src={process.env.PUBLIC_URL + "/description-svgrepo-com.png"}
                alt="Addy"
              />
              Description:
            </h6>
            <p>{add.description}</p>
            <h6>
              <img
                className="rec_icon"
                src={process.env.PUBLIC_URL + "/category-svgrepo-com.png"}
                alt="Addy"
              />
              Categories:
            </h6>
            <p>{add.category.category_name}</p>
          </div>
        )}
        <div className="ctn-additional">
          <div className="ctn-p-profile">
            <h5>
              <img
                className="rec_icon"
                src={process.env.PUBLIC_URL + "/author-sign-svgrepo-com.png"}
                alt="Addy"
              />
              Author:
            </h5>
            <div className="ctn-profile">
              <h6>sayan123srev@gmail.com</h6>
              <img src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg" />
            </div>
            <br />
            <button className="btn btn-danger btn-custom">
              <img
                className="rec_icon"
                src={
                  process.env.PUBLIC_URL +
                  "/call-dropped-rounded-svgrepo-com.png"
                }
                alt="Addy"
              />
              Contact with author
            </button>
            <br />
          </div>
          <h4>
            <img
              className="rec_icon"
              src={process.env.PUBLIC_URL + "/bulb-on-svgrepo-com.png"}
              alt="Addy"
            />
            More like this:{" "}
          </h4>
          <div className="ctn-recomendations">
            <img
              className="rec_img"
              src="https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg"
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
          <div className="ctn-recomendations">
            <img
              className="rec_img"
              src="https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg"
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
          <div className="ctn-recomendations">
            <img
              className="rec_img"
              src="https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg"
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
              alt="Addy"
            />
            See more like this
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
