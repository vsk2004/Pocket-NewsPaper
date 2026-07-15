from pathlib import Path

content = '''import React, { useState, useEffect } from 'react'
import NewsItem from './NewItem'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

function News({ country = 'us', pageSize = 8, category = 'general', apiKey, setProgress }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pagesize=${pageSize}`;
    setLoading(true);
    setProgress(30);
    const data = await fetch(url);
    const parsedData = await data.json();
    setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    document.title = `${category} NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, country, apiKey, pageSize]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pagesize=${pageSize}`;
    setPage(nextPage);
    setLoading(true);
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-center" style={{ marginTop: '90px' }}>NewMonkey Head Lines</h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4>Loading</h4>}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : " "}
                  description={element.description ? element.description.slice(0, 88) : " "}
                  imageurl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
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
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};

export default News
'''
Path('src/components/News.js').write_text(content, encoding='utf-8')
print('News.js overwritten')
