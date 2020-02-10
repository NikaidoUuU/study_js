import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    isDone: true
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    isDone: true
  },
  {
    id: 3,
    text: "Context 만들기",
    isDone: false
  },
  {
    id: 4,
    text: "기능 구현하기",
    isDone: false
  }
];

const todoReducer = (todos, action) => {
  switch (action.type) {
    case "CREATE":
      return [...todos, action.todo];
    case "TOGGLE":
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "REMOVE":
      return todos.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodoState = () => {
  const context = useContext(TodoStateContext);

  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }

  return context;
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);

  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }

  return context;
};

export const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);

  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }

  return context;
};
