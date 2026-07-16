import React from "react";
import { Link } from "react-router-dom";
import {
  FaNewspaper,
  FaBookmark,
  FaSearch,
  FaStickyNote,
  FaLock,
} from "react-icons/fa";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="overlay"></div>

      <div className="welcome-content">

        <div className="glass-card">

          <div className="hero-badge">Curated news • saved instantly • always secure</div>

          <h1 className="welcome-title">
            📰 Pocket Newspaper
          </h1>

          <p className="welcome-subtitle">
            Read. Save. Search. Stay Updated.
          </p>

          <p className="welcome-description">
            Experience the latest news from around the world with a modern,
            secure, and personalized platform. Save articles, create notes,
            search instantly, and never miss an important update.
          </p>

          <div className="button-group">

          <Link to="/login" className="welcome-login-btn">
                Login
          </Link>

          <Link to="/signup" className="welcome-signup-btn">
              Create Account
          </Link>

          </div>

          <div className="feature-grid">

            <div className="feature-card">
              <FaNewspaper className="feature-icon" />
              <h5>Latest News</h5>
              <p>Real-time news updates across multiple categories.</p>
            </div>

            <div className="feature-card">
              <FaBookmark className="feature-icon" />
              <h5>Save Articles</h5>
              <p>Bookmark your favorite news and read anytime.</p>
            </div>

            <div className="feature-card">
              <FaStickyNote className="feature-icon" />
              <h5>Notes</h5>
              <p>Create personal notes while reading articles.</p>
            </div>

            <div className="feature-card">
              <FaSearch className="feature-icon" />
              <h5>Smart Search</h5>
              <p>Quickly find articles using powerful search.</p>
            </div>

            <div className="feature-card">
              <FaLock className="feature-icon" />
              <h5>Secure Access</h5>
              <p>JWT Authentication protects your account.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Welcome;