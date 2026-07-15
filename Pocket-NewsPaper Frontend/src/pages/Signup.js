import React, { useState } from "react";
import "./../css/Signup.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaNewspaper,
} from "react-icons/fa";

function Signup(props) {
const navigate = useNavigate();
const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);

const handleSignup = async (e) => {

    e.preventDefault();

    try {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (
            response.ok &&
            data.message === "Account created successfully!"
        ) {

            props.showAlert("Account Created Successfully!", "success");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } else {

            props.showAlert(
                data.message || "Signup Failed!",
                "warning"
            );

        }

    } catch (error) {

      

        props.showAlert("Server Error!", "danger");

    }

};

  return (

    <div className="signup-container">

      <div className="signup-card">

        <div className="logo">

          <FaNewspaper className="logo-icon" />

          <h1>Pocket Newspaper</h1>

        </div>

        <p className="subtitle">
          Read • Save • Stay Updated
        </p>

        <h2>Create Account 🚀</h2>

       <form onSubmit={handleSignup}>

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
                     type="text"
                    placeholder="Enter your full name"
                    value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
            />

          </div>

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
                 placeholder="Create a password"
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
        <button type="submit" className="login-btn">
                Create Account
        </button>

        </form>

        <p className="signup-link">

          Already have an account?

          <Link to="/login"> Login</Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;