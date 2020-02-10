import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "./TodoContext";

const CircleButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  outline: none;
  border: none;
  border-radius: 50%;
  font-size: 60px;
  background: #38d9a9;
  color: white;
  z-index: 100;
  transform: translate(-50%, 50%);
  transition: 0.125s all ease-in;
  cursor: pointer;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }
  ${props =>
    props.isOpen &&
    css`
      background: #ff6b6b;
      transform: translate(-50%, 50%) rotate(45deg);
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
    `}
`;

const InsertFormPositioner = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  border-top: 1px solid #e9ecef;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  outline: none;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 18px;
`;

const TodoCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setIsOpen(!isOpen);
  const onChange = e => setValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault();

    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current++,
        text: value,
        done: false
      }
    });

    setValue("");
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} isOpen={isOpen}>
        <MdAdd />
      </CircleButton>
    </>
  );
};

export default TodoCreate;
