import React, { useReducer, useRef, useCallback } from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';

function createBulkTodos() {
  const array = [];

  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false
    });
  }

  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return [...todos, action.todo];
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    default:
      return todos;
  }
}

const Container = styled.main`
  width: 512px;
  margin: 6rem auto 0;
  border-radius: 4px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background: ${palette.cyan[5]};
  color: white;
  font-size: 1.5rem;
`;

const Content = styled.div`
  background: white;
`;

const TodoTemplate = () => {
  //   const [todos, setTodos] = useState([
  //     {
  //       id: 1,
  //       text: '리액트의 기초 알아보기',
  //       checked: true
  //     },
  //     {
  //       id: 2,
  //       text: '컴포넌트 스타일링해 보기',
  //       checked: true
  //     },
  //     {
  //       id: 3,
  //       text: '일정 관리 앱 만들어 보기',
  //       checked: false
  //     }
  //   ]);

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 렌더링되지 않는 값
  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    dispatch({ type: 'INSERT', todo });
    // setTodos(todos => [...todos, todo]);
  }, []);

  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id });
    // setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE', id });
    // setTodos(todos =>
    //   todos.map(todo =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo
    //   )
    // );
  }, []);

  return (
    <Container>
      <Title>일정 관리</Title>
      <Content>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </Content>
    </Container>
  );
};

export default TodoTemplate;
