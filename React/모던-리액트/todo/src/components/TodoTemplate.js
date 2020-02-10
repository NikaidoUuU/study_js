import React from "react";
import styled from "styled-components";

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 512px;
  height: 768px;
  margin: 96px auto 32px;
  margin-bottom: 32px;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  background: white;
`;

const TodoTemplate = ({ children }) => <Main>{children}</Main>;

export default TodoTemplate;
