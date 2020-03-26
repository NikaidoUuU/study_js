const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const CREATE = 'todos/CREATE';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const changeInput = input => ({
  type: CHANGE_INPUT,
  input
});

let nextId = 3;
export const create = text => ({
  type: CREATE,
  todo: {
    id: nextId++,
    text,
    done: false
  }
});

export const toggle = id => ({
  type: TOGGLE,
  id
});

export const remove = id => ({
  type: REMOVE,
  id
});

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false
    }
  ]
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input
      };
    case CREATE:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.todo
        ]
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map(todo => (
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ))
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    default:
      return state;
  }
}
