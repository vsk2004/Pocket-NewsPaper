import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewItem";

import { useAuth } from "../context/AuthContext";
export default function SearchResults({ showAlert }) {

    const { token, logout } = useAuth();
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword") || "";
    const searchNews = useCallback(async () => {

    setLoading(true);

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/news/search?keyword=${keyword}&page=0&size=10`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.status === 401 || response.status === 403) {
        logout();
        showAlert("Session expired. Please login again.", "warning");
        navigate("/login");
        return;
    }

    const data = await response.json();

    setArticles(data.content);
    setTotalResults(data.totalElements);
    setPage(1);
    setLoading(false);

}, [keyword, token, logout, showAlert, navigate]);

    const fetchMoreData = async () => {

    const response = await fetch(

        `${process.env.REACT_APP_API_URL}/api/news/search?keyword=${keyword}&page=${page}&size=10`,

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

    setArticles(previousArticles => [
        ...previousArticles,
        ...data.content
    ]);

    setPage(prev => prev + 1);

    };
useEffect(() => {
    searchNews();
}, [searchNews]);
return (
  <div
    className="container-fluid py-4"
    style={{
      backgroundColor: "#f4f7fc",
      minHeight: "100vh",
    }}
  >
    <div className="container">

     
      <div
        className="shadow-lg rounded-4 p-5 text-white"
        style={{
          marginTop: "70px",
          background: "linear-gradient(135deg,#6610f2,#0d6efd)",
        }}
      >
        <h1 className="fw-bold display-6">
          🔍 Search News
        </h1>

        <p className="mt-3 mb-0 fs-5">
          Search through your Pocket Newspaper database instantly.
        </p>
      </div>

    

      {!loading && (
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">

          <div>

            <h3 className="fw-bold mb-1">
              Results for
              <span className="text-primary"> "{keyword}"</span>
            </h3>

            <p className="text-muted mb-0">
              Search completed successfully.
            </p>

          </div>

          <span className="badge bg-primary fs-6 px-3 py-2">

            {totalResults} Articles Found

          </span>

        </div>
      )}

     

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>
      )}

    

      {!loading && articles.length === 0 && (

        <div className="text-center py-5">

          <h1 style={{ fontSize: "70px" }}>
            🔍
          </h1>

          <h2 className="fw-bold mt-4">
            No Results Found
          </h2>

          <p className="text-muted fs-5 mt-3">
            No news articles were found for
            <strong> "{keyword}"</strong>.
          </p>

          <p className="text-muted">
            Try searching with another keyword.
          </p>

          <div className="mt-4">

            <span className="badge bg-primary me-2">
              India
            </span>

            <span className="badge bg-success me-2">
              Sports
            </span>

            <span className="badge bg-warning text-dark me-2">
              Technology
            </span>

            <span className="badge bg-danger">
              Business
            </span>

          </div>

        </div>

      )}

      

      {!loading && articles.length > 0 && (

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={
            <div className="text-center my-4">
              <div
                className="spinner-border text-primary"
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>
            </div>
          }
        >

          <div className="row">

            {articles.map((article) => (

              <div
                className="col-md-4"
                key={article.articleId}
              >

                <NewsItem
                  showAlert={showAlert}
                  title={article.title}
                  description={article.description}
                  imageurl={article.imageUrl}
                  newsUrl={article.articleUrl}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source}
                />

              </div>

            ))}

          </div>

        </InfiniteScroll>

      )}

    </div>
  </div>
);
}