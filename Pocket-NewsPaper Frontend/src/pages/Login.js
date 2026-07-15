import React, { useState } from "react";
import "./../css/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaNewspaper,
} from "react-icons/fa";

function Login(props) {

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),

      });

      const data = await response.json();

      if (response.ok) {

        login(data.token);

        props.showAlert("Login successful!", "success");

        navigate("/");

      } else {

        if (response.status === 401) {

          props.showAlert(
            data.message || "Invalid email or password!",
            "warning"
          );

        } else {

          props.showAlert(
            data.message || "Login failed!",
            "danger"
          );

        }

      }

    } catch (error) {

  

      props.showAlert(
        "Server Error! Please try again.",
        "danger"
      );

    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="logo">
          <FaNewspaper className="logo-icon" />
          <h1>Pocket Newspaper</h1>
        </div>

        <p className="subtitle">
          Read • Save • Stay Updated
        </p>

        <h2>Welcome Back 👋</h2>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p className="signup-link">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>

    </div>
  );

}

export default Login;