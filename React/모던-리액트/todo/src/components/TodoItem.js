import React, { memo } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from "./TodoContext";

const Remove = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #dee2e6;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    ${Remove} {
      display: flex;
    }
  }
`;

const CheckCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-right: 20px;
  border: 1px solid #ced4da;
  border-radius: 16px;
  font-size: 24px;
  cursor: pointer;
  ${props =>
    props.isDone &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.isDone &&
    css`
      color: #ced4da;
    `}
`;

const TodoItem = ({ id, isDone, text }) => {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });

  return (
    <Container>
      <CheckCircle isDone={isDone} onClick={onToggle}>
        {isDone && <MdDone />}
      </CheckCircle>
      <Text isDone={isDone}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </Container>
  );
};

export default memo(TodoItem);
