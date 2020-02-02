import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NewsItem from "./NewsItem";
import usePromise from "../lib/usePromise";

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  padding-bottom: 3rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const NewsList = ({ category }) => {
  //   const [articles, setArticles] = useState(null);
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     setLoading(true);

  //     const fetchData = async () => {
  //       try {
  //         const query = category === "all" ? "" : `&category=${category}`;
  //         const response = await axios.get(
  //           `https://newsapi.org/v2/top-headlines?country=kr${query}&apikey=e215166ff4d1472195a34a8361491fe9`
  //         );
  //         setArticles(response.data.articles);
  //       } catch (e) {
  //         console.log(e);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [category]);

  //   if (loading) {
  //     return <Container>대기 중...</Container>;
  //   }

  //   if (!articles) {
  //     return null;
  //   }
  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apikey=e215166ff4d1472195a34a8361491fe9`
    );
  }, [category]);

  if (loading) {
    return <Container>대기 중...</Container>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <Container>에러 발생!</Container>;
  }

  const { articles } = response.data;
  return (
    <Container>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </Container>
  );
};

export default NewsList;
