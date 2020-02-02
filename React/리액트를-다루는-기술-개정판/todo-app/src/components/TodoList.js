import React, { memo } from 'react';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const Container = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TodoList = ({ todos, onRemove, onToggle }) => (
  <Container>
    {todos.map(todo => (
      <TodoListItem
        key={todo.id}
        todo={todo}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    ))}
  </Container>
);

export default memo(TodoList);
