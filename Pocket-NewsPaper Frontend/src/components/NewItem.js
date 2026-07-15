import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./NewsItem.css";

function NewItem({
  id,
  title,
  description,
  imageurl,
  newsUrl,
  author,
  date,
  source,
  showAlert,
  savedPage,
  getSavedArticles,
}) {

  const { token, logout } = useAuth();

  const navigate = useNavigate();

 const handleSaveArticle = async () => {

  try {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/saved-articles/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl: imageurl,
          articleUrl: newsUrl,
          author,
          source,
          publishedAt: date,
        }),
      }
    );

    if (response.ok) {

      showAlert("Article Saved Successfully!", "success");

    } else {

      const errorMessage = await response.text();

      if (errorMessage.includes("already saved")) {

        showAlert("Article already saved!", "warning");

      } else {

        showAlert("Already to Save Article", "danger");

      }

    }

  } catch (error) {

   

    showAlert("Server Error", "danger");

  }

};
  const handleDeleteArticle = async () => {

    try {

      const response = await fetch(

        `${process.env.REACT_APP_API_URL}/api/saved-articles/delete/${id}`,

        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {

        logout();

        showAlert(
          "Session expired. Please login again.",
          "warning"
        );

        navigate("/login");

        return;
      }

      if (response.ok) {

        showAlert("Article Deleted", "success");

        getSavedArticles();

      } else {

        showAlert("Failed to Delete", "danger");

      }

    } catch (error) {

      showAlert("Server Error", "danger");

    }

  };
  return (
  <div className="my-4">
    <div className="card news-card">

      <div className="news-image-container">

        <span className="source-badge">
          {source}
        </span>

        <img
          src={!imageurl ? "/image/no-image.png" : imageurl}
          className="news-image"
          alt="news"
        />

      </div>

      <div className="news-content">

        <h5 className="news-title">
          {title}
        </h5>

        <p className="news-description">
          {description}
        </p>

        <div className="news-meta">

          <div className="mb-2">
            <i className="bi bi-person-circle"></i>

            {!author ? "Unknown Author" : author}
          </div>

          <div>
            <i className="bi bi-clock-history"></i>

            {new Date(date).toGMTString()}
          </div>

        </div>

        <div className="news-buttons">

         <a
            href={newsUrl}
            className="btn news-btn read-btn"
          >
          <i className="bi bi-book-half me-2"></i>
           Read More
          </a>

          {savedPage ? (

            <button
              className="btn news-btn delete-btn"
              onClick={handleDeleteArticle}
            >
              <i className="bi bi-trash-fill me-2"></i>

              Delete
            </button>

          ) : (

            <button
              className="btn news-btn save-btn"
              onClick={handleSaveArticle}
            >
              <i className="bi bi-bookmark-fill me-2"></i>

              Save
            </button>

          )}

        </div>

      </div>

    </div>
  </div>
);
}
export default NewItem;