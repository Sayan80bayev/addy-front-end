import React from "react";
import { useState } from "react";
import Footer from "../Footer";
const Profile = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById("image-input").click();
  };
  return (
    <>
      <main>
        <h2 className="mb-3">Profile</h2>
        <form className="row row-cols-2 mb-5 ">
          <div className="avatar-input">
            <input
              type="file"
              id="image-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div
              style={{ display: "flex", height: "100%" }}
              onClick={handleClick}
            >
              <img
                className="current-avatar"
                src={imageUrl}
                alt="Click to select image"
              />
              <img
                src={process.env.PUBLIC_URL + "/edit-3-svgrepo-com.png"}
                alt="Edit"
                style={{ height: "20px", width: "20px" }}
              />
            </div>
          </div>
          <div
            className="row p-form"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Email* </label>
            <input type="text" className="form-controll" disabled readonly />
            <label>Name* </label>
            <input type="text" className="form-controll" />
            <label>New password*</label>
            <input type="text" className="form-controll" />
            <label>Confirm password*</label>
            <input type="text" className="form-controll" />
            <label>Password*</label>
            <input type="text" className="form-controll" />
            <button type="submit" className="">
              submit
            </button>
          </div>
        </form>
        <Footer />
      </main>
    </>
  );
};
export default Profile;
