import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/App.css";

export default function Login() {
  var currentUrl = window.location.href;
  var url = new URL(currentUrl);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({
        status: "error",
        message: "Email and password are required",
      });
      return;
    }
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
        return navigate("/index");
      } else {
        setMessage({
          status: "error",
          message: "Wrong credentials",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        message: "Authentication failed",
      });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="password"
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
          <br />
          {message?.status && (
            <p className="alert alert-danger">{message.message}</p>
          )}
          {url?.searchParams.has("out") && (
            <p className="alert alert-success">Successfully logged out!</p>
          )}
        </form>
      </div>
    </>
  );
}
