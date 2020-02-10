import React from "react";
import styled from "styled-components";
import { useTodoState } from "./TodoContext";

const Container = styled.div`
  padding: 48px 32px 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    font-size: 21px;
    color: #868e96;
  }
  .tasks-left {
    margin-top: 40px;
    font-size: 18px;
    font-weight: bold;
    color: #20c997;
  }
`;

const TodoHead = () => {
  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => !todo.isDone);

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <Container>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </Container>
  );
};

export default TodoHead;
