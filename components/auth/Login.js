import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/App.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let message = "";
  try {
    const result = location.state.message;
    message = result;
  } catch (error) {}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/authenticate",
        {
          email: email,
          password: password,
        }
      );
      if (response.data != null) {
        localStorage.setItem("authToken", response.data.token);
        console.log(localStorage.getItem("authToken"));
        return navigate("/index");
      } else {
        setError("Authentication failed");
      }
    } catch (error) {
      setError("Authentication failed");
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <Link to="/registration">Signup now</Link>
          </div>
          <p className="alert alert-danger">{message ?? null}</p>
          <br />
          {error && <p className="alert alert-danger">{error}</p>}
        </form>
      </div>
    </>
  );
}
