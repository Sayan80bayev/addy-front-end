import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { subscribe, unsubscribe } from "../api";
import { jwtDecode } from "jwt-decode";
import { simplifyTimestamp } from "./utils"; // Separate utility functions

export default function Adds({ advertisements }) {
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setEmail(jwtDecode(token)?.sub);
      setToken(token);
    }
  }, []);
  const [changed, setChanged] = useState();
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get("http://localhost:3001/subs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const subscriptionsWithStatus = response.data.map((sub) => ({
          ...sub,
          isSubscribed: true,
        }));
        setActiveSubscriptions(subscriptionsWithStatus);
        if (changed) setChanged(false);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, [email, changed]);
  const handleBellClick = async (e, advertisementId) => {
    e.stopPropagation();
    const isSubscribed =
      activeSubscriptions.filter(
        (sub) => sub.advertisement_id === advertisementId
      ).length > 0;
    try {
      if (isSubscribed) {
        await unsubscribe(email, advertisementId, token);
        setActiveSubscriptions((prevSubs) =>
          prevSubs.filter((id) => id !== advertisementId)
        );
      } else {
        await subscribe(email, advertisementId, token);
        setActiveSubscriptions((prevSubs) => [...prevSubs, advertisementId]);
      }
    } catch (error) {
      console.error("Error handling subscription:", error);
    }
    setChanged(true);
  };

  return (
    <div className="ctn">
      {advertisements.map((advertisement) => {
        const isSubscribed =
          activeSubscriptions.filter(
            (sub) => sub.advertisement_id === advertisement.id
          ).length > 0;

        return (
          <div key={advertisement.id} className="card-ctn">
            <div className="card add">
              {advertisement.images.length > 0 ? (
                <img
                  src={`data:image/jpeg;base64,${advertisement.images[0].imageData}`}
                  alt="First Image"
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/empty.jpg"}
                  alt={advertisement.title}
                />
              )}
              <div className="card-info">
                <h5>
                  <Link
                    to={"/view/" + advertisement.id}
                    className="link_to_full"
                  >
                    {advertisement.title}
                  </Link>
                  <button
                    className={`bell ${
                      isSubscribed ? "active" : "not-subscribed"
                    }`}
                    onClick={(e) => handleBellClick(e, advertisement.id)}
                  >
                    <svg
                      className="bell-icon"
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 611.999 611.999"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <g>
                              <path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"></path>
                              <path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258C323.259,126.96,315.532,119.235,306.001,119.235z"></path>
                            </g>
                          </g>
                        </g>
                      </g>{" "}
                    </svg>
                  </button>
                </h5>
                <p className="price">
                  <b>{advertisement.price}</b>
                </p>
                <p>{advertisement.category.category_name}</p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <small>{simplifyTimestamp(advertisement.date)}</small>
                  <div className="views">
                    <img
                      className="rec_icon"
                      src={process.env.PUBLIC_URL + "/view-eye-svgrepo-com.png"}
                      alt="Views Icon"
                    />
                    <h6 style={{ display: "block" }}>{advertisement.views}</h6>
                  </div>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
