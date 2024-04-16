import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState({ status: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/registration",
        user
      );
      setMessage({ status: response.status, message: response.data });
    } catch (error) {
      setMessage({
        status: "error",
        message: error.response
          ? error.response.data
          : "Registration failed. Please try again later.",
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Registration Form</div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            required
            name="email"
            onChange={handleInputChange}
          />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input
            type="text"
            required
            name="username"
            onChange={handleInputChange}
          />
          <label>Name</label>
        </div>
        <div className="field">
          <input
            type="password"
            required
            name="password"
            onChange={handleInputChange}
          />
          <label>Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Register" />
        </div>
        <div className="signup-link">
          Already registered? <Link to="/login">Log in now</Link>
        </div>
        <br />
      </form>
    </div>
  );
}
