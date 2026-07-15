import React, { useState, useEffect } from 'react';
import NewsItem from './NewItem';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function News({ country = 'in', category = 'top', setProgress, showAlert }) {

  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] =useState(false);

  const updateNews = async (showNotification = false) => {

    if (setProgress) setProgress(10);

    const url = `${process.env.REACT_APP_API_URL}/api/news/db?country=${country}&category=${category}`;

    setLoading(true);

    if (setProgress) setProgress(30);
    const response = await fetch(url, {
         headers: {
                Authorization: `Bearer ${token}`
                 }
      });
      if (response.status === 401 || response.status === 403) {

        logout();

        showAlert(
              "Session expired. Please login again.",
              "warning"
         );

       navigate("/login");

         return;
    }

    const parsedData = await response.json();

    if (setProgress) setProgress(70);

    if (
      showNotification &&
      articles.length > 0 &&
      parsedData.content.length > 0 &&
      articles[0].articleId !== parsedData.content[0].articleId
    ) {
      showAlert("📰 Latest news has been updated!", "success");
    }

    setArticles(parsedData.content);
    setTotalResults(parsedData.totalElements);
    setPage(1);
    setLoading(false);

    if (setProgress) setProgress(100);
  };

  const fetchMoreData = async () => {

    const url = `${process.env.REACT_APP_API_URL}/api/news/db?country=${country}&category=${category}&page=${page}&size=10`;

      const response = await fetch(url, {
         headers: {
                Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 401 || response.status === 403) {

          logout();

        showAlert(
              "Session expired. Please login again.",
              "warning"
        );

       navigate("/login");

      return;
    }

    const parsedData = await response.json();

    setArticles(previousArticles => [
      ...previousArticles,
      ...parsedData.content
    ]);

    setPage(prevPage => prevPage + 1);

  };

  useEffect(() => {

    document.title =
      `${category.charAt(0).toUpperCase() + category.slice(1)} Pocket-NewsPaper`;

    setArticles([]);
    setPage(0);
    setTotalResults(0);

    updateNews();

    const interval = setInterval(() => {
      updateNews(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, country]);

  return (
    <div>

      <h2 className="text-center" style={{ marginTop: '70px' }}>
        Pocket Newspaper -{category.charAt(0).toUpperCase() + category.slice(1)} Headlines
      </h2>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={
          <div className="text-center my-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >

        <div className="container">
          <div className="row">

            {articles.map((element) => (

              <div className="col-md-4" key={element.articleId}>

                <NewsItem
                  showAlert={showAlert}
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageurl={element.imageUrl}
                  newsUrl={element.articleUrl}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source}
                />

              </div>

            ))}

          </div>
        </div>

      </InfiniteScroll>

    </div>
  );
}

News.defaultProps = {
  country: 'in',
  category: 'top',
};

News.propTypes = {
  country: propTypes.string,
  category: propTypes.string,
  setProgress: propTypes.func,
};

export default News;