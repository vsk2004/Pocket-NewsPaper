import React, { useState, useEffect } from "react";
import NewsItem from "./NewItem";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HistoryNews.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Last7Days({ showAlert }) {

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const days = [
    "Today",
    "Yesterday",
    "2 Days Ago",
    "3 Days Ago",
    "4 Days Ago",
    "5 Days Ago",
    "6 Days Ago"
  ];

  const categories = [
    "all",
    "top",
    "sports",
    "business",
    "technology",
    "entertainment",
    "health",
    "science"
  ];

  const getFormattedDate = (selectedDay) => {

    const today = new Date();

    switch (selectedDay) {
      case "Yesterday":
        today.setDate(today.getDate() - 1);
        break;
      case "2 Days Ago":
        today.setDate(today.getDate() - 2);
        break;
      case "3 Days Ago":
        today.setDate(today.getDate() - 3);
        break;
      case "4 Days Ago":
        today.setDate(today.getDate() - 4);
        break;
      case "5 Days Ago":
        today.setDate(today.getDate() - 5);
        break;
      case "6 Days Ago":
        today.setDate(today.getDate() - 6);
        break;
      default:
        break;
    }

    return today.toISOString().split("T")[0];
  };

  const getHistoryNews = async () => {

    try {

      setLoading(true);

      const date = getFormattedDate(selectedDate);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/news/history?date=${date}&category=${selectedCategory}&page=0&size=10`,
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

      setArticles(data.content);
      setTotalResults(data.totalElements);
      setPage(1);

    } catch (error) {

      console.log(error);
      showAlert("Failed to fetch history news", "danger");

    } finally {

      setLoading(false);

    }

  };

  const fetchMoreHistory = async () => {

    try {

      const date = getFormattedDate(selectedDate);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/news/history?date=${date}&category=${selectedCategory}&page=${page}&size=10`,
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

      setPage(prevPage => prevPage + 1);

    } catch (error) {

      showAlert("Failed to load more history", "danger");

    }

  };

  useEffect(() => {

    setArticles([]);
    setPage(0);
    setTotalResults(0);

    getHistoryNews();

    // eslint-disable-next-line
  }, [selectedDate, selectedCategory]);

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: "#f4f7fc",
        minHeight: "100vh"
      }}
    >
      <div className="container">

        <div
          className="shadow-lg rounded-4 p-5 text-white"
          style={{
            background: "linear-gradient(135deg,#0d6efd,#4b8df8)"
          }}
        >
          <h1 className="fw-bold display-6">
            📰 Pocket Newspaper Archive
          </h1>

          <p className="mt-3 mb-0 fs-5">
            Browse and revisit news published during the last 7 days.
          </p>
        </div>

        <div className="mt-5">

          <h4 className="fw-bold mb-4">
            📅 Choose a Day
          </h4>

          <div className="row g-3">

            {days.map((day) => (

              <div className="col-lg-2 col-md-3 col-6" key={day}>

                <div
                  className={`card shadow-sm text-center p-3 h-100 ${
                    selectedDate === day ? "border-primary" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    borderRadius: "18px",
                    transition: ".3s",
                    background:
                      selectedDate === day
                        ? "#0d6efd"
                        : "#ffffff",
                    color:
                      selectedDate === day
                        ? "white"
                        : "#222"
                  }}
                  onClick={() => setSelectedDate(day)}
                >
                  <h5 className="mb-0 fw-bold">
                    {day}
                  </h5>
                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="mt-5">

          <h4 className="fw-bold mb-4">
            🏷️ Categories
          </h4>

          <div className="d-flex flex-wrap gap-3">

            {categories.map((category) => (

              <button
                key={category}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-outline-primary"
                } rounded-pill px-4 py-2`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>

            ))}

          </div>

        </div>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">
                Loading...
              </span>
            </div>
          </div>
        )}

        {!loading && (

          <div className="mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h4 className="fw-bold">
                📚 Archive Results
              </h4>

              <span className="badge bg-primary fs-6 px-3 py-2">

                {articles.length} Articles • {selectedDate} •{" "}

                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)}

              </span>

            </div>

            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreHistory}
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

                {articles.length === 0 ? (

                  <div className="text-center py-5">

                    <h1 style={{ fontSize: "55px" }}>
                      🗂️
                    </h1>

                    <h3 className="fw-bold text-secondary mt-3">
                      No Archived News Available
                    </h3>

                    <p className="text-muted fs-5 mt-3">

                      No articles were found for

                      <strong> {selectedDate}</strong>

                      {selectedCategory !== "all" && (
                        <>
                          {" "}
                          in the{" "}
                          <strong>
                            {selectedCategory.charAt(0).toUpperCase() +
                              selectedCategory.slice(1)}
                          </strong>{" "}
                          category.
                        </>
                      )}

                    </p>

                    <div
                      className="alert alert-info mt-4 d-inline-block shadow-sm"
                      role="alert"
                    >
                      📅 Archived news will appear automatically as the scheduler
                      collects articles every hour.
                    </div>

                  </div>

                ) : (

                  articles.map((article) => (

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

                  ))

                )}

              </div>

            </InfiniteScroll>

          </div>

        )}

      </div>

    </div>
  );
}