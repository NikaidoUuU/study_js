import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "all",
    text: "전체보기"
  },
  {
    name: "business",
    text: "비즈니스"
  },
  {
    name: "entertainment",
    text: "엔터테인먼트"
  },
  {
    name: "health",
    text: "건강"
  },
  {
    name: "science",
    text: "과학"
  },
  {
    name: "sports",
    text: "스포츠"
  },
  {
    name: "technology",
    text: "기술"
  }
];

const Container = styled.div`
  display: flex;
  width: 768px;
  margin: 0 auto;
  padding: 1rem 0;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  padding-bottom: 0.25rem;
  font-size: 1.125rem;
  text-decoration: none;
  color: inherit;
  white-space: pre;
  cursor: pointer;
  &:hover {
    color: #495057;
  }
  & + & {
    margin-left: 1rem;
  }
  &.active {
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    font-weight: 600;
    &:hover {
      color: #3bc9db;
    }
  }
`;

const Categories = () => (
  <Container>
    {categories.map(c => (
      <Category
        key={c.name}
        activeClassName="active"
        exact={c.name === "all"}
        to={c.name === "all" ? "/" : `/${c.name}`}
      >
        {c.text}
      </Category>
    ))}
  </Container>
);

export default Categories;
