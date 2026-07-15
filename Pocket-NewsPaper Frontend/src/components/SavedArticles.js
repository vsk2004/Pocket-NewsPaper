import React, { useState, useEffect } from "react";
import NewsItem from "./NewItem";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SavedArticles({ showAlert }) {

  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const [savedArticles, setSavedArticles] = useState([]);

  const getSavedArticles = async () => {

    try {

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/saved-articles/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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

      const data = await response.json();

      setSavedArticles(data);

    } catch (error) {

      

      showAlert("Failed to fetch saved articles", "danger");

    }

  };

  useEffect(() => {

    getSavedArticles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="container my-3">

      {/* Hero Section */}

      <div
        className="shadow rounded-4 p-5 text-white mb-5"
        style={{
          marginTop: "70px",
          background: "linear-gradient(135deg,#198754,#28a745)"
        }}
      >

        <h1 className="fw-bold display-6">
          📚 Saved Articles
        </h1>

        <p className="mt-3 mb-0 fs-5">
          Your personal collection of news articles. Read them anytime.
        </p>

      </div>

      {/* Summary */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h4 className="fw-bold">
          Saved News
        </h4>

        <span className="badge bg-success fs-6 px-3 py-2">
          {savedArticles.length} Articles Saved
        </span>

      </div>

      {/* Empty State or Articles */}

      {savedArticles.length === 0 ? (

        <div className="text-center py-5">

          <h1 style={{ fontSize: "70px" }}>
            📂
          </h1>

          <h3 className="fw-bold mt-3">
            No Saved Articles Yet
          </h3>

          <p className="text-muted fs-5 mt-3">
            Articles you save from the News page will appear here.
          </p>

          <div
            className="alert alert-success mt-4 d-inline-block shadow-sm"
            role="alert"
          >
            ⭐ Save interesting articles and build your own personal news library.
          </div>

        </div>

      ) : (

        <div className="row">

          {savedArticles.map((article) => (

            <div className="col-md-4" key={article.id}>

              <NewsItem
                id={article.id}
                title={article.title}
                description={article.description}
                imageurl={article.imageUrl}
                newsUrl={article.articleUrl}
                author={article.author}
                date={article.publishedAt}
                source={article.source}
                showAlert={showAlert}
                savedPage={true}
                getSavedArticles={getSavedArticles}
              />

            </div>

          ))}

        </div>

      )}

    </div>

  );

}