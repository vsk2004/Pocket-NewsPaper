
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar(props) {
const [keyword, setKeyword] = useState("");
const navigate = useNavigate();
const { logout } = useAuth();
const handleLogout = () => {
    logout();
     props.showAlert("Logout Successful!", "success");
    

        navigate("/login");
};
const handleSearch = (e) => {

    e.preventDefault();

    if (!keyword.trim()) {
        return;
    }

    navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    setKeyword("");  
};
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsPaper</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nation">Nation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">Technology</Link>
              </li>
               <li className="nav-item mx-2">
                <Link className="nav-link" to="/Notes">My-Notes</Link>
              </li>
                             <li className="nav-item mx-2">
                <Link className="nav-link" to="/SavedArticles">Saved-Articles</Link>
              </li>
              <li className="nav-item">
                 <Link className="nav-link" to="/last7days">
                <i className="bi bi-calendar-week me-1"></i> Last 7 Days
                 </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center ms-auto">

            <form
                className="d-flex me-4"
                onSubmit={handleSearch}
            >

            <input
                  className="form-control me-3"
                  style={{ width: "180px" }}
                  type="search"
                  placeholder="Search News..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
           />

            <button
                className="btn btn-outline-light"
                type="submit"
           >
                Search
           </button>

        </form>

        <button
               className="btn btn-outline-primary"
               onClick={handleLogout}
        >
           Logout
        </button>

        </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
