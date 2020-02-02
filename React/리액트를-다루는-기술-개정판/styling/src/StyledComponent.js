import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  desktop: 1024,
  tablet: 768
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

const Box = styled.div`
  display: flex;
  width: 1024px;
  margin: 0 auto;
  padding: 1rem;
  background: ${props => props.color || "blue"};
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`}
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  background: white;
  color: black;
  font-size: 1rem;
  font-weight: 600;
  box-sizing: border-box;
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  & + & {
    margin-left: 1rem;
  }
  ${props =>
    props.inverted &&
    css`
      border: 2px solid white;
      background: none;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `}
`;

const StyledComponent = () => (
  <Box>
    <Button>안녕하세요</Button>
    <Button inverted>테두리만</Button>
  </Box>
);

export default StyledComponent;
